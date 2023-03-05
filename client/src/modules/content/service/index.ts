import axios from 'axios';
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from 'src/constants';
import { IPost } from 'src/interfaces/post';
import { setAuthToken } from 'src/utils/request';

export const ContentService = {
    getList: async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
            try {
                const response = await axios.get(`${API_URL}/post/list`);
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
    create: async (data: Partial<IPost>) => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
            try {
                const response = await axios.post(
                    `${API_URL}/post/create`,
                    data
                );
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
    update: async (id: string, data: Partial<IPost>) => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
            try {
                const response = await axios.put(`${API_URL}/post/${id}`, data);
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
    get: async (id: string) => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
            try {
                const response = await axios.get(`${API_URL}/post/${id}`);
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
    delete: async (id: string) => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
            try {
                const response = await axios.delete(`${API_URL}/post/${id}`);
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

export default ContentService;
