import { memo, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Footer from 'src/layout/components/footer';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    FieldProp,
    FormBuilder,
    validationUtils,
} from '@jeremyling/react-material-ui-form-builder';
import { useForm } from 'react-hook-form';
import { useAsyncFn } from 'react-use';
import AuthService from '../../service';
import { IAuth, ILogin } from 'src/interfaces';
import { LoadingButton } from '@mui/lab';
import Alert from 'src/components/alert';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from 'src/redux/actions/auth';
import { authSelector } from 'src/redux/selectors/auth';
const LoginView = () => {
    const [state, loginFn] = useAsyncFn(AuthService.loginUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (data) => {
        loginFn(data);
    };
    const authState = useSelector(authSelector);
    const schema = validationUtils.getFormSchema(fields());
    const methods = useForm<ILogin>({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (state.value?.success) {
            const authState: IAuth = {
                isAuthenticated: true,
                user: state.value.user,
            };
            dispatch(setAuth(authState));
            navigate('/', { replace: true });
        }
    }, [state]);

    if (authState.isAuthenticated) {
        return <Navigate to="/" />;
    }

    function fields(): Array<FieldProp> {
        return [
            {
                component: 'text-field',
                attribute: 'username',
                label: 'Username',
                props: {
                    fullWidth: true,
                    autoComplete: 'username',
                },
                validationType: 'string',
                validations: [['required', true]],
            },
            {
                component: 'text-field',
                attribute: 'password',
                label: 'Password',
                props: {
                    fullWidth: true,
                    autoComplete: 'current-password',
                    type: 'password',
                },
                validationType: 'string',
                validations: [['required', true]],
            },
            {
                component: 'switch',
                attribute: 'remember',
                label: 'Remember login',
                options: [false, true],
            },
        ];
    }

    return (
        <>
            {state?.value && <Alert {...state.value} />}
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
                            onSubmit={methods.handleSubmit(handleSubmit)}
                            sx={{ mt: 1 }}
                        >
                            <FormBuilder
                                fields={fields()}
                                methods={methods}
                                defaultValue={null}
                            >
                                <LoadingButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    loading={state.loading}
                                >
                                    Login
                                </LoadingButton>
                            </FormBuilder>
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
