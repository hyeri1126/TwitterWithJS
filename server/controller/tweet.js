import * as tweetRepository from '../data/tweet.js'

// 컨트롤러 - 비즈니스 로직을 다룸! 
// 모델(data)과 통신하고 관련된 데이터를 받아오고 에러처리함 


export async function getTweets (req, res) {
    const username = req.query.username; //없다면 undefined
    const data =await (username 
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
    res.status(200).json(data);
}


export async function getById (req, res) {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id)
    if(tweet){
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message:`Tweet id(${id}) not found`});
    }
}

export async function createTweet (req, res) {
    const {text, name, username} = req.body;
    const tweet = await tweetRepository.create(text, name, username)
    res.status(201).json(tweet);
}

export async function updateTweet (req, res) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.update(id, text)
    if(tweet) {
        tweet.text = text;
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message:`Tweet id(${id}) not found`});
    }
}

export async function deleteTweet(req, res){
    const id = req.params.id;
    await tweetRepository.deleteTweet(id);
    res.sendStatus(204);
}