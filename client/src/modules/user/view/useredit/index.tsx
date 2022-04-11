import { memo, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { IUser } from 'src/interfaces';
import Typography from '@mui/material/Typography';
import { useAsync, useAsyncFn } from 'react-use';
import {
    FieldProp,
    FormBuilder,
    validationUtils,
} from '@jeremyling/react-material-ui-form-builder';
import { Box, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthService from 'src/modules/auth/service';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../service';

const UserEditView = () => {
    const [state, registerFn] = useAsyncFn(AuthService.registerUser);
    const navigate = useNavigate();
    const { id } = useParams();
    const userState = useAsync(() => UserService.get(id || ''), [id]);

    const user = userState.value?.user || {};
    console.log('user', user);

    const handleSubmit = (data: IUser) => {
        registerFn(data);
    };

    useEffect(() => {
        if (state.value?.success) {
            navigate('/user/list', { replace: true });
        }
    }, [state]);

    function fields(): Array<FieldProp> {
        return [
            {
                component: 'text-field',
                attribute: 'username',
                label: 'Tên người dùng',
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
                label: 'Mật khẩu',
                props: {
                    fullWidth: true,
                    autoComplete: 'current-password',
                    type: 'password',
                },
                validationType: 'string',
                validations: [['required', true]],
            },
            {
                component: 'text-field',
                attribute: 'name',
                label: 'Họ và tên',
                props: {
                    fullWidth: true,
                },
                validationType: 'string',
                validations: [['required', true]],
            },
            {
                component: 'text-field',
                attribute: 'phone',
                label: 'Số điện thoại',
                props: {
                    fullWidth: true,
                },
                validationType: 'number',
            },
        ];
    }

    const schema = validationUtils.getFormSchema(fields());

    const methods = useForm<IUser>({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    });
    return (
        <Grid item xs={12}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Grid container maxWidth={'70%'}>
                    <Grid item xs={12} md={4}>
                        <Typography component="h1" variant="h5">
                            {id ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box
                            component="form"
                            onSubmit={methods.handleSubmit(handleSubmit)}
                            sx={{ my: 8, mx: 4 }}
                        >
                            <FormBuilder
                                fields={fields()}
                                methods={methods}
                                defaultValue={{
                                    name: user.name,
                                    username: user.username,
                                    phone: user.phone,
                                }}
                            >
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    loading={state.loading}
                                >
                                    {id ? 'Chỉnh sửa' : 'Tạo mới'}
                                </LoadingButton>
                            </FormBuilder>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default memo(UserEditView);
