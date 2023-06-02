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
    TextField,
    Typography,
} from '@mui/material';
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { isEmpty } from 'lodash';
import { memo, useEffect, useMemo, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import { FormBuilder, RequestAlert } from 'src/components';
import { IPost } from 'src/interfaces/post';
import { getFormSchema } from 'src/utils';
import ContentService from '../../service';
import ImageUpload from './components/ImageUpload';
import { fields } from './config';
import './style.scss';

const BoxUser = styled(Box)<{ component?: React.ElementType }>({
    '& .MuiLink-root': {
        display: 'flex',
    },
});

const StyledPreviewHtmlTextfield = styled(TextField)<{
    component?: React.ElementType;
}>({
    '&.MuiTextField-root': {
        width: '100%',
    },
});

const PostEditView = () => {
    const [createState, cretateFn] = useAsyncFn(ContentService.create);
    const [updateState, updateFn] = useAsyncFn(ContentService.update);
    const [getState, getFn] = useAsyncFn(ContentService.get);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
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

    useEffect(() => {
        if (post?.htmlBody) {
            const blocksFromHtml = convertFromHTML(post.htmlBody);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(
                contentBlocks,
                entityMap
            );
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [post]);

    const onSubmit = (data: Partial<IPost>) => {
        console.log(data, data);
        console.log(
            'editorState',
            draftToHtml(convertToRaw(editorState.getCurrentContent()))
        );

        const _data = {
            ...data,
            htmlBody: draftToHtml(
                convertToRaw(editorState.getCurrentContent())
            ),
            jsonBody: convertToRaw(editorState.getCurrentContent())
        };
        id ? updateFn(id, _data) : cretateFn(_data);
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

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

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
                        <Grid
                            container
                            spacing={4}
                            component="form"
                            onSubmit={methods.handleSubmit(onSubmit)}
                            noValidate
                        >
                            <Grid item xs={12} md={8}>
                                <Box sx={{ my: 4 }}>
                                    <FormBuilder
                                        fields={fieldsConfig}
                                        methods={methods}
                                    />
                                    <Editor
                                        editorState={editorState}
                                        wrapperClassName="super-editor-wrapper"
                                        editorClassName="super-editor"
                                        onEditorStateChange={
                                            onEditorStateChange
                                        }
                                    />
                                    <StyledPreviewHtmlTextfield
                                        hiddenLabel
                                        disabled
                                        multiline
                                        value={draftToHtml(
                                            convertToRaw(
                                                editorState.getCurrentContent()
                                            )
                                        )}
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
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ my: 4, p: 2 }}>
                                    <ImageUpload thumbUrl={post.thumbUrl} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </BoxUser>
            </Grid>
        </>
    );
};

export default memo(PostEditView);
