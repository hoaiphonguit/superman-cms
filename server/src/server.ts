import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import {
    appCMSRouter,
    authCMSRouter,
    photoCMSRouter,
    postCMSRouter,
    userCMSRouter,
} from './routes/cms';
import * as redis from 'redis';
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
export const redisClient = redis.createClient();

// echo redis errors to the console
redisClient.on('error', (err) => {
    console.log('Error ' + err);
});

app.use(cors());
app.use(express.json());

// CMS api
app.use('/api/post', postCMSRouter);
app.use('/api/auth', authCMSRouter);
app.use('/api/user', userCMSRouter);
app.use('/api/appConfig', appCMSRouter);
app.use('/api/upload', photoCMSRouter);
app.use('/statics', express.static('public/data/uploads'));

export default app;
