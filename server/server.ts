import * as cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import * as express from 'express';
import { connectToServer } from './src/db/conn';
import appRouter from './src/routes/app';
import authRouter from './src/routes/auth';
import postRouter from './src/routes/post';
import userRouter from './src/routes/user';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/post', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/appConfig', appRouter);

app.listen(port, () => {
    // perform a database connection when server starts
    connectToServer();
    console.log(`Server is running on port: ${port}`);
});
