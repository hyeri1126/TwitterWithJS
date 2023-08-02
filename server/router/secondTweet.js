import express from 'express';
import * as tweetRepository from '../data/tweet.js'


// ------------------------ 1차 리팩토링 진행(컨트롤러 도입 전) --------------------------
// 리팩토링 내용 : tweet과 관련된 data를 가지고 있는 tweetRepository(/data/tweet.js) 생성!  
// tweetRepository에서 tweets을 관리하기 때문에 필요없음!


// GET /tweets
// GET /tweets?username=:username
router.get('/', (req, res, next) => {
    const username = req.query.username; //없다면 undefined
    const data = username 
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll();
    res.status(200).json(data);
})

// GET /tweets/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweetRepository.getById(id)
    if(tweet){
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message:`Tweet id(${id}) not found`});
    }
})


// POST /tweets
router.post('/', (req, res, next) => {
    const {text, name, username} = req.body;
    const tweet = tweetRepository.create(text, name, username)
    res.status(201).json(tweet);
})


// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweetRepository.update(id, text)
    if(tweet) {
        tweet.text = text;
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message:`Tweet id(${id}) not found`});
    }
})

// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    tweetRepository.deleteTweet(id);
    res.sendStatus(204);
})



export default router;