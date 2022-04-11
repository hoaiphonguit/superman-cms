import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsync } from 'react-use';
import Spinner from './components/spinner';
import { IAuth, IUser } from './interfaces';
import Layout from 'src/layout';
import AuthService from './modules/auth/service';
import LoginView from './modules/auth/view/login';
import { setAuth } from './redux/actions/auth';
import { authSelector } from './redux/selectors/auth';
import AppRoutes from './routes';

const App = () => {
    const state = useAsync(AuthService.auth);
    const dispatch = useDispatch();
    const authState = useSelector(authSelector);

    useEffect(() => {
        let authState: IAuth = {
            loading: false,
            isAuthenticated: false,
            user: {} as IUser,
        };
        if (state.value?.message) {
            if (state.value?.success) {
                authState = {
                    loading: false,
                    isAuthenticated: true,
                    user: state.value.user,
                };
            }
        }

        dispatch(setAuth(authState));
    }, [state]);

    if (state.loading || authState.loading) {
        return <Spinner />;
    }

    if (!authState.isAuthenticated) {
        return <LoginView />;
    }

    return (
        <Layout>
            <AppRoutes />
        </Layout>
    );
};

export default App;
