import express from 'express';
import cors from 'cors';
import morgan from 'morgan'; //디버깅에 이용
import helmet from 'helmet';
import tweetRouter from './router/tweets.js'
import authRouter from './router/auth.js'

const app = express();
app.use(express.json());
app.use(helmet())
app.use(cors()) //option 없으면 모든 cors 허용
app.use(morgan('tiny'))

app.use('/tweets', tweetRouter);
app.use('/auth', authRouter);


app.use((req, res, next) => {
    res.sendStatus(404) // 404:not found(지원하지 않는 api)
})
app.use((req, res, next) => {
    console.error(error);
    res.sendStatus(500);
})
app.listen(8080);