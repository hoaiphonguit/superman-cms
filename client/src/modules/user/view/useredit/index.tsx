import { memo, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { IUser } from 'src/interfaces';
import Typography from '@mui/material/Typography';
import { useAsync, useAsyncFn } from 'react-use';
import {
    FieldProp,
    FormBuilder,
    validationUtils,
} from '@jeremyling/react-material-ui-form-builder';
import { Box, Card, CardHeader, Divider, Link, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthService from 'src/modules/auth/service';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../service';
import { isEmpty } from 'lodash';
import UserInfo from './userinfo';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BoxUser = styled(Box)<{ component?: React.ElementType }>({
    '& .MuiLink-root': {
        display: 'flex',
    },
});

const UserEditView = () => {
    const [state, registerFn] = useAsyncFn(AuthService.registerUser);
    const [updateState, updateFn] = useAsyncFn(UserService.update);
    const [user, setUser] = useState<IUser>({} as IUser);
    const navigate = useNavigate();
    const { id } = useParams();
    const userState = useAsync(() => UserService.get(id || ''), [id]);

    useEffect(() => {
        const _user = userState.value?.user;
        if (_user) {
            setUser(_user);
        }
    }, [userState]);

    const handleSubmit = (data: IUser) => {
        id ? updateFn(id, data) : registerFn(data);
    };

    useEffect(() => {
        if (
            (state.value && !state.value?.success) ||
            (updateState.value && !updateState.value?.success)
        ) {
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
                hideCondition: !isEmpty(id),
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
                hideCondition: !isEmpty(id),
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
                validationType: 'string',
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
                    <Grid container xs={12} md={8} spacing={4}>
                        <Grid item xs={12} md={8}>
                            <Box
                                component="form"
                                onSubmit={methods.handleSubmit(handleSubmit)}
                                sx={{ my: 4 }}
                            >
                                <FormBuilder
                                    fields={fields()}
                                    methods={methods}
                                    defaultValue={{ ...user }}
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
            </BoxUser>
        </Grid>
    );
};

export default memo(UserEditView);
