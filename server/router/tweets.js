import express from 'express';
import {body} from 'express-validator'
import { validate } from '../middleware/validator.js';
import * as tweetController from '../controller/tweet.js'


// ------------- mvc 구조로 리팩토링 진행 -----------------
// ------------- 컨트롤러 도입 ------------
// 여기서는 controller만 import 하고 controller에서 tweet(data) import

const router = express.Router();


// getTweets()호출하는 것이 아니라 getTweets 이렇게 연결만!
// 유효성 검사 적용하기! 
const validateTweet =  [
    body('text')
        .trim()
        .isLength({min:3})
        .withMessage('text should be at least 3'),
    validate,
]


// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets)


// GET /tweets/:id
router.get('/:id', tweetController.getById)


   
// POST /tweets
router.post(
    '/',
    validateTweet,
    tweetController.createTweet
);


// PUT /tweets/:id
router.put('/:id', tweetController.updateTweet)


// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet)



export default router;