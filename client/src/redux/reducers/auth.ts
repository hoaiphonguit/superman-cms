import { Reducer } from 'redux';
import { IAuth, IUser } from 'src/interfaces';
import { SET_AUTH } from '../actions/auth';

const defaultState: IAuth = {
    loading: true,
    isAuthenticated: false,
    user: {} as IUser,
};

const authReducer: Reducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_AUTH:
            return { ...payload };
        default:
            return state;
    }
};

export default authReducer;
