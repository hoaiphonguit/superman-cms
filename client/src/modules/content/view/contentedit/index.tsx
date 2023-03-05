import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingButton } from '@mui/lab';
import {
    Box,
    Card,
    CardHeader,
    Divider,
    Grid,
    Link,
    Paper,
    styled,
    Typography
} from '@mui/material';
import { isEmpty } from 'lodash';
import { memo, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import { FormBuilder, RequestAlert } from 'src/components';
import { IPost } from 'src/interfaces/post';
import { getFormSchema } from 'src/utils';
import ContentService from '../../service';
import { fields } from './config';

const BoxUser = styled(Box)<{ component?: React.ElementType }>({
    '& .MuiLink-root': {
        display: 'flex',
    },
});

const PostEditView = () => {
    const [createState, cretateFn] = useAsyncFn(ContentService.create);
    const [updateState, updateFn] = useAsyncFn(ContentService.update);
    const [getState, getFn] = useAsyncFn(ContentService.get);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getFn(id);
        } else {
            console.log('enter');
            methods.reset({});
        }
    }, [id]);

    const post: IPost = getState.value?.post || {};

    const onSubmit = (data: Partial<IPost>) => {
        console.log(data, data);
        id ? updateFn(id, data) : cretateFn(data);
    };

    const fieldsConfig = useMemo(() => fields(post), [post]);

    const schema = getFormSchema(fieldsConfig);

    const methods = useForm({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (!isEmpty(post)) {
            methods.reset(post);
        }
    }, [post]);

    useEffect(() => {
        if (
            (createState.value && createState.value?.success) ||
            (updateState.value && updateState.value?.success)
        ) {
            navigate('/post/all-list', { replace: true });
        }
    }, [createState, updateState]);

    return (
        <>
            {createState?.value && <RequestAlert {...createState.value} />}
            {updateState?.value && <RequestAlert {...updateState.value} />}
            <Grid item xs={12}>
                <BoxUser>
                    <Box mb={4}>
                        <Link
                            component={RouterLink}
                            to="/post/all-list"
                            underline="hover"
                            color="inherit"
                        >
                            <ArrowBackIcon />
                            <Typography ml={2}>Danh sách bài viết</Typography>
                        </Link>
                    </Box>
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
                                        ? 'Chỉnh sửa bài viết'
                                        : 'Thêm bài viết'}
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
                                    noValidate
                                >
                                    <FormBuilder
                                        fields={fieldsConfig}
                                        methods={methods}
                                    />
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 2 }}
                                        loading={
                                            createState.loading ||
                                            updateState.loading
                                        }
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

export default memo(PostEditView);
