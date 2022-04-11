import { IStoreState } from 'src/interfaces/store';

export const authSelector = (state: IStoreState) => state.auth;
export const userSelector = (state: IStoreState) => state.auth.user;
