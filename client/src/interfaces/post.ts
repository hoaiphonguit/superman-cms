import { RawDraftContentState } from 'draft-js';
import { IUser } from './auth';

export enum EPostStatus {
    'DRAFT', // Đang biên tập
    'SUBMITTED', // Đã gửi
    'SUBMITTED_RETURN', // Yêu cầu biên tập lại,
    'APPROVED', // Đã duyệt
    'PUBLISHED', // Đã đăng,
    'DISCONTINUTED',
}

export interface IPost {
    _id: string;
    title: string;
    thumbUrl: string;
    description: string;
    url: string;
    status: EPostStatus;
    author: IUser;
    createdAt: number;
    publishDate: number;
    htmlBody: string;
    jsonBody: RawDraftContentState;
}
