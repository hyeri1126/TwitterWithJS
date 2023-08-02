import express from 'express';

let tweets = [
    {
        id:'1',
        text:'express api 활용 twitter',
        createdAt: Date.now().toString(),
        name: 'Bob',
        username: 'Bob',
        // url: ''
    },
    {
        id: '2',
        text:"안뇽!",
        createdAt: Date.now().toString(),
        name: 'hyeri',
        username: 'hyeri',
    },
    {
        id:'3',
        text:"i'm ellie",
        createdAt: Date.now().toString(),
        name: 'Ellie',
        username: 'Ellie'
    }
];

const router = express.Router();


// GET /tweets
// GET /tweets?username=:username -> username은 query! 있어도 되고 없어도됨! 있는 경우에는 username에 해당하는 트윗만 표기!
router.get('/', (req, res, next) => {
    const username = req.query.username; //없다면 undefined
    const data = username 
     ? tweets.filter((t) => t.username === username)
    : tweets;
    res.status(200).json(data);
})


// GET /tweets/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweets.find(t => t.id === id);
    if(tweet){
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message:`Tweet id(${id}) not found`});
    }
})

// POST /tweets
// body schema : text, username, name
// const text = req.body.text; const username = req.body.username; const name = req.body.name; //하나하나 선언하는 경우
router.post('/', (req, res, next) => {
    const {text, name, username} = req.body;
    // body를 기반으로 새로운 tweet 생성!
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt : new Date(),
        name,
        username,
    };
    tweets = [tweet, ...tweets]
    res.status(201).json(tweet);
})


// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find(t => t.id === id);
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
    tweets = tweets.filter(t => t.id !== id);
    res.sendStatus(204);
})

export default router;