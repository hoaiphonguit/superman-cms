import { memo, useEffect } from 'react';
import { IUser } from 'src/interfaces';
import { useAsyncFn } from 'react-use';
import {
    Box,
    Card,
    CardHeader,
    Divider,
    Grid,
    Link,
    Paper,
    styled,
    Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { AuthService } from 'src/modules/auth';
import { UserService } from 'src/modules/user';
import { useNavigate, useParams } from 'react-router-dom';
import UserInfo from './userinfo';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { RequestAlert } from 'src/components';
import { isEmpty, method } from 'lodash';
import { TFieldProp } from 'src/components/form/interface';
import FormBuilder from 'src/components/form/FormBuilder';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const BoxUser = styled(Box)<{ component?: React.ElementType }>({
    '& .MuiLink-root': {
        display: 'flex',
    },
});

const schema = yup.object({
    name: yup.string().required(),
    phone: yup.string().required(),
});

const UserEditView = () => {
    const [state, registerFn] = useAsyncFn(AuthService.registerUser);
    const [updateState, updateFn] = useAsyncFn(UserService.update);
    const [userState, getUserFn] = useAsyncFn(UserService.get);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getUserFn(id);
        }
    }, []);

    const user: IUser = userState.value?.user || {};

    const onSubmit = (data: any) => {
        console.log('data', data);
        id ? updateFn(id, data) : registerFn(data);
    };

    const fields: Array<TFieldProp> = [
        {
            component: 'text-field' as 'text-field',
            attribute: 'username',
            label: 'Tên người dùng',
            hideCondition: !isEmpty(user),
        },
        {
            component: 'text-field' as 'text-field',
            attribute: 'password',
            label: 'Mật khẩu',
            props: {
                type: 'password',
            },
            hideCondition: !isEmpty(user),
        },
        {
            component: 'text-field' as 'text-field',
            attribute: 'name',
            label: 'Họ và tên',
        },
        {
            component: 'text-field' as 'text-field',
            attribute: 'phone',
            label: 'Số điện thoại',
        },
    ];

    const methods = useForm({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        methods.reset(user);
    }, [user]);

    useEffect(() => {
        if (
            (state.value && !state.value?.success) ||
            (updateState.value && !updateState.value?.success)
        ) {
            navigate('/user/list', { replace: true });
        }
    }, [state, updateState]);

    return (
        <>
            {state?.value && <RequestAlert {...state.value} />}
            {updateState?.value && <RequestAlert {...updateState.value} />}
            <Grid item xs={12}>
                <BoxUser>
                    <Box mb={4}>
                        <Link
                            component={RouterLink}
                            to="/user/list"
                            underline="hover"
                            color="inherit"
                        >
                            <ArrowBackIcon />
                            <Typography ml={2}>Người dùng</Typography>
                        </Link>
                    </Box>
                    {!isEmpty(user) && <UserInfo {...user} />}
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            mt: 4,
                        }}
                        component={Card}
                    >
                        <CardHeader
                            title={
                                <Typography variant="h6">
                                    {id
                                        ? 'Chỉnh sửa người dùng'
                                        : 'Thêm người dùng'}
                                </Typography>
                            }
                            sx={{ px: 0 }}
                        />
                        <Divider />
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={8}>
                                <Box
                                    component="form"
                                    sx={{ my: 4 }}
                                    onSubmit={methods.handleSubmit(onSubmit)}
                                >
                                    <FormBuilder
                                        fields={fields}
                                        methods={methods}
                                    />
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 2 }}
                                        loading={state.loading}
                                    >
                                        {id ? 'Chỉnh sửa' : 'Tạo mới'}
                                    </LoadingButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </BoxUser>
            </Grid>
        </>
    );
};

export default memo(UserEditView);
