import express from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js'
import {isAuth} from '../middleware/auth.js'

const router = express.Router();

// 유효성 검사! -> express validator 
const validateCredential = [
   body('username')
    .trim()
    .notEmpty()
    .withMessage('username should be at least 5 char') ,
   body('password')
    .trim()
    .isLength({min:5})
    .withMessage('password should be at least 5 char'),
    validate,
]

const validateSignup = [
    ...validateCredential, 
    body('name').notEmpty().withMessage('name is missing'),
    body('email').isEmail().normalizeEmail().withMessage('invalid email'),
    body('url').isURL().withMessage('invalid URL').optional({nullable:true, checkFalsy:true}),
    validate, 
]

// 컨트롤러 -> 함수(api) 연결!

// POST /auth/signup
router.post('/signup', validateSignup, authController.signup)

// POST /auth/login
router.post('/login', validateCredential, authController.login)


// isAuth -> 로그인 후, 유효한지 아닌지 확인하는 api!
// GET /auth/me
router.get('/me', isAuth, authController.me )


export default router;