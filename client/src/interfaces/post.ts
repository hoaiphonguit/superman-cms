import { IUser } from './auth';

export enum EPostStatus {
    TO_LEARN,
    LEARNING,
    FINISH,
}

export interface IPost {
    _id: string;
    title: string;
    description: string;
    url: string;
    status: EPostStatus;
    author: IUser;
}
