import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
    Avatar,
    Box,
    CssBaseline,
    Grid,
    Link,
    Paper,
    Typography
} from '@mui/material';
import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import { FormBuilder, RequestAlert } from 'src/components';
import { TFieldProp } from 'src/interfaces';
import { Footer } from 'src/layout/components';
import { AuthService } from 'src/modules/auth';
import * as yup from 'yup';

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
    },
    {
        component: 'text-field' as 'text-field',
        attribute: 'password',
        label: 'Mật khẩu',
        props: {
            type: 'password',
        },
    },
    {
        component: 'text-field' as 'text-field',
        attribute: 'name',
        label: 'Họ và tên',
        props: {
            type: 'name',
        },
    },
];

const RegisterView = () => {
    const [state, registerFn] = useAsyncFn(AuthService.registerUser);
    const navigate = useNavigate();
    const onSubmit = (data: any) => {
        registerFn(data);
    };

    useEffect(() => {
        if (state.value?.success) {
            navigate('/login', { replace: true });
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
                            Register
                        </Typography>
                        <Box
                            component="form"
                            sx={{ mt: 1 }}
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <FormBuilder fields={fields} methods={methods}>
                                <LoadingButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    loading={state.loading}
                                >
                                    Register
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
                                    <Link href="/login" variant="body2">
                                        Login
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

export default memo(RegisterView);
