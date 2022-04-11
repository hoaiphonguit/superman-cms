import axios from 'axios';
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from 'src/constants';
import { ILogin, IUser } from 'src/interfaces';
import { setAuthToken } from 'src/utils/request';

export const AuthService = {
    loginUser: async (data: ILogin): Promise<any> => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, data);
            if (response.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );
            }
            return response.data;
        } catch (error: any) {
            if (error.response.data) {
                return error.response.data;
            }
            return {
                success: false,
                message: error.message,
            };
        }
    },
    logoutUser: async (): Promise<any> => {
        try {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            return {
                success: true,
                message: 'User logout successfully',
            };
        } catch (error: any) {
            if (error.response.data) {
                return error.response.data;
            }
            return {
                success: false,
                message: error.message,
            };
        }
    },
    registerUser: async (data: IUser): Promise<any> => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, data);
            return response.data;
        } catch (error: any) {
            if (error.response.data) {
                return error.response.data;
            }
            return {
                success: false,
                message: error.message,
            };
        }
    },
    auth: async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
            try {
                const response = await axios.get(`${API_URL}/auth`);
                if (!response.data.success) {
                    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
                }
                return response.data;
            } catch (error: any) {
                if (error.response.data) {
                    return error.response.data;
                }
                return {
                    success: false,
                    message: error.message,
                };
            }
        }
    },
};

export default AuthService;
