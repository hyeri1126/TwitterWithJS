import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt'
import * as userRepository from '../data/user.js'

// 컨트롤러에서 userRepository를 사용해서 사용자를 읽고 저장하는 비즈니스 로직!

// make it secure
const bcryptSaltRounds = 10;
const jwtSecretKey = 'shfioanckl335'
const jwtExpireInDays = '2d'

// POST /auth/signup
export async function signup(req, res) {
    const {username, password, name, email, url} = req.body;
    const found = await userRepository.findByUsername(username)
    // 이미 존재하면 에러 메세지, 아니면 새로운 유저 등록!
    // 회원가입성공! 
    if(found){
        return res.status(409).json({message: `${username} already exists`});
    }
    const hashed = await bcrypt.hash(password, bcryptSaltRounds)
    const userId = await userRepository.createUser({
        username, 
        password:hashed,
        name,
        email,
        url,
    })
    // 토큰생성! 
    const token = createJwtToken(userId) //서버에서 받은 사용자의 고유한 id로 token 생성!
    res.status(201).json({token, username})  // 생성한 토큰 전달!
}

// POST /auth/login
export async function login(req, res) {
    const {username, password} = req.body
    const user = await userRepository.findByUsername(username);
    if(!user){
        return res.status(401).json({message:'Invalid user'})
    }
    // db에 저장된 해쉬 버전의 password와 사용자가 입력한 password 비교!
    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword){
        return res.status(401).json({message : 'Invalid password'})
    }
    // 토큰생성!
    const token = createJwtToken(user.id) 
    res.status(200).json({token, username})

}

export async function me(req, res) {
    const user = await userRepository.findById(req.id)
    if(!user){
        return res.status(404).json({message : `User not found!`})
    }
    res.status(200).json({token : req.token, username: user.username})
}

// 토큰생성함수, 토큰({header, payload, signature})
function createJwtToken(id) {
    return jwt.sign({id}, jwtSecretKey, {expiresIn : jwtExpireInDays} )
}