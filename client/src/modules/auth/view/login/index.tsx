import { memo, useEffect } from 'react';
import { Footer } from 'src/layout/components';
import { useForm } from 'react-hook-form';
import { useAsyncFn } from 'react-use';
import { IAuth, TFieldProp } from 'src/interfaces';
import { LoadingButton } from '@mui/lab';
import { RequestAlert } from 'src/components';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from 'src/redux/actions';
import { authSelector } from 'src/redux/selectors';
import { AuthService } from 'src/modules/auth';
import {
    Avatar,
    Box,
    CssBaseline,
    Grid,
    Link,
    Paper,
    Typography,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormBuilder from 'src/components/form/FormBuilder';

const schema = yup
    .object({
        username: yup.string().required(),
        password: yup.string().required(),
    })
    .required();

const fields: Array<TFieldProp> = [
    {
        component: 'text-field' as 'text-field',
        attribute: 'username',
        label: 'Tên người dùng',
        props: {
            autoComplete: 'username',
        },
    },
    {
        component: 'text-field' as 'text-field',
        attribute: 'password',
        label: 'Mật khẩu',
        props: {
            type: 'password',
            autoComplete: 'password',
        },
    },
];

const LoginView = () => {
    const [state, loginFn] = useAsyncFn(AuthService.loginUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSubmit = (data: any) => {
        console.log('data', data);
        loginFn(data);
    };
    const authState = useSelector(authSelector);

    useEffect(() => {
        if (state.value?.success) {
            const auth: IAuth = {
                isAuthenticated: true,
                user: state.value.user,
            };
            dispatch(setAuth(auth));
            navigate('/', { replace: true });
        }
    }, [state]);

    const methods = useForm({
        defaultValues: {
            username: 'phongvh',
            password: '',
        },
        mode: 'onTouched',
        resolver: yupResolver(schema),
    });

    if (authState.isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <>
            {state?.value && <RequestAlert {...state.value} />}
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(./images/superman.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light'
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
                        <Typography component="h1" variant="h5">
                            Login to Superman
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={methods.handleSubmit(onSubmit)}
                            sx={{
                                mt: 1,
                                '& .MuiTextField-root': { m: 1 },
                            }}
                            noValidate
                        >
                            <FormBuilder fields={fields} methods={methods} />
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 }}
                                loading={state.loading}
                            >
                                Login
                            </LoadingButton>
                            <Grid container sx={{ mt: 1 }}>
                                <Grid item xs>
                                    <Link
                                        href="/forget-password"
                                        variant="body2"
                                    >
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        Register
                                    </Link>
                                </Grid>
                            </Grid>
                            <Footer sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default memo(LoginView);
