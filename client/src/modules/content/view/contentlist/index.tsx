import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, Toolbar, Typography } from '@mui/material';
import { memo, useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import { ConfirmDialog, SuperTable } from 'src/components';
import { IPost } from 'src/interfaces/post';
import ContentService from '../../service';
import { actions, columns } from './config';

const ContentListView = () => {
    const [state, stateFn] = useAsyncFn(ContentService.getList);
    const list = state.value?.list || [];
    const [openDelete, setOpenDelete] = useState(false);
    const [currPost, setCurrPost] = useState<IPost>();
    const navigate = useNavigate();

    useEffect(() => {
        stateFn();
    }, []);

    const handleDeletePost = (post: IPost) => {
        setOpenDelete(true);
        setCurrPost(post);
    };

    const handelEditPost = (post: IPost) => {
        navigate(`/post/edit/${post._id}`, { replace: true });
    };

    const onDeletePost = async () => {
        if (currPost) {
            const resp = await ContentService.delete(currPost._id);
            if (resp.success) {
                setOpenDelete(false);
                setCurrPost(undefined);
                stateFn();
            }
        }
    };

    const actionsConfig = useMemo(
        () => actions(handelEditPost, handleDeletePost),
        []
    );

    return (
        <Grid item xs={12}>
            <Toolbar disableGutters={true}>
                <Typography
                    component="h1"
                    variant="h5"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Danh sách người dùng
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={RouterLink}
                    to="/user/add"
                    size="large"
                >
                    Thêm
                </Button>
            </Toolbar>
            <SuperTable
                data={list}
                columns={columns}
                actions={actionsConfig}
                hasIndex
            />
            <ConfirmDialog
                open={openDelete}
                setOpen={setOpenDelete}
                title="Bạn có chắc chắn muốn xóa bài viết này?"
                onOk={onDeletePost}
            />
        </Grid>
    );
};

export default memo(ContentListView);
