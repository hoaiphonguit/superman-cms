import { IAuth } from 'src/interfaces';
export const SET_AUTH = 'SET_AUTH';

export const setAuth = (state: IAuth) => ({
    type: SET_AUTH,
    payload: state,
});
