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
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();

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
