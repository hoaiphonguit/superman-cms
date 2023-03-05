import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsync } from 'react-use';
import { Spinner } from './components';
import { IAuth, IUser } from './interfaces';
import Layout from 'src/layout';
import { AuthService } from './modules/auth';
import { setAuth } from './redux/actions';
import { authSelector } from './redux/selectors';
import AppRoutes from './routes';

const App = () => {
    const state = useAsync(AuthService.auth);
    const dispatch = useDispatch();
    const authState = useSelector(authSelector);

    useEffect(() => {
        let auth: IAuth = {
            loading: true,
            isAuthenticated: false,
            user: {} as IUser,
        };
        if (state.value?.message) {
            if (state.value?.success) {
                auth = {
                    loading: false,
                    isAuthenticated: true,
                    user: state.value.user,
                };
            } else {
                auth = {
                    loading: false,
                    isAuthenticated: false,
                    user: {} as IUser,
                };
            }
        }

        dispatch(setAuth(auth));
    }, [state]);

    if (state.loading || authState.loading) {
        return <Spinner />;
    }

    if (!authState.isAuthenticated) {
        return <AppRoutes />;
    }

    return (
        <Layout>
            <AppRoutes />
        </Layout>
    );
};

export default App;
