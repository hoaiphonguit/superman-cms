import axios from 'axios';
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from 'src/constants';
import { INavigator, IResponseList } from 'src/interfaces';
import { setAuthToken } from 'src/utils/request';

export const AppService = {
    appConfig: async (): Promise<IResponseList<INavigator> | undefined> => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
            try {
                const response = await axios.get(`${API_URL}/appConfig`);
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

export default AppService;
