import axios from 'axios';
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from 'src/constants';
import { setAuthToken } from 'src/utils/request';

export const UserService = {
    getList: async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
            try {
                const response = await axios.get(`${API_URL}/user/list`);
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

export default UserService;