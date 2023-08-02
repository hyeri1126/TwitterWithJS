//  로그인이나 회원가입하면 서버로부터 토큰을 받음! 
// 따라서 서버에게 토큰을 보여주면 로그인한 사람임을 인증함 
// 로그인한 사용자는 토큰을 서버에게 주면서 나 로그인한 사람인데 내 토큰이 아직 유효하니?
// -> auth/me
// 헤더에 Authorization <type> <password> 명시해야함!
import jwt from 'jsonwebtoken'
import * as userRepository from '../data/user.js'

const AUTH_ERROR = {message : 'Authentication Error!'};

// isAuth -> 비동기로 동작하는 콜백함수! or 미들웨어!
// 헤더에 Authorization이 존재하는가?
// 있다면 검증가능한 jwt인가? (불가능이면 error, 검증되었으면 decoded true!)
// decoded가 true여도 db에 있는 유저가 맞는지 한번 더 확인하기!
export const isAuth = async(req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!(authHeader && authHeader.startsWtith('Bearer '))){
        return res.status(401).json({AUTH_ERROR})
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        'shfioanckl335',
        async (error, decoded) => {
            if(error){
                return res.status(401).json(AUTH_ERROR)
            }
            const user = await userRepository.findById(decoded.id)
            if(!user){
                return res.status(401).json(AUTH_ERROR)
            }
            req.userId = user.id; //request에 userId 추가! 다른 callback함수에서 동일하게 접근해야하는 data
            next()
        }
    )
}