import { memo, useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';
import { UserService } from 'src/modules/user';
import { IUser, IColumn } from 'src/interfaces';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ConfirmDialog, SuperTable } from 'src/components';
import dayjs from 'dayjs';
import { Button, Grid, Toolbar, Typography } from '@mui/material';
import ContentService from '../../service';
import { IPost } from 'src/interfaces/post';

const columns: IColumn<IPost>[] = [
    { id: 'title', label: 'Tiêu đề' },
    { id: 'description', label: 'Mô tả ngắn' },
    { id: 'status', label: 'Trạng thái', format: (status) => 'Đang học' },
    {
        id: 'author',
        label: 'Tác giả',
        render: (author) => <div>{author.name}</div>
    },
];

const ContentListView = () => {
    const [state, stateFn] = useAsyncFn(ContentService.getList);
    const list = state.value?.list || [];
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [currUser, setCurrUser] = useState<IUser>();

    useEffect(() => {
        stateFn();
    }, []);

    const handleClickOpen = (user: IUser) => {
        setOpen(true);
        setCurrUser(user);
    };

    const onDeleteUser = async () => {
        if (currUser) {
            const resp = await UserService.delete(currUser._id);
            if (resp.success) {
                setOpen(false);
                setCurrUser(undefined);
                stateFn();
            }
        }
    };

    const onBanUser = async (user: IUser) => {
        if (user) {
            const resp = await UserService.update(user._id, {
                ...user,
                baned: !!user.baned ? 0 : 1,
            });
            if (resp.success) {
                stateFn();
            }
        }
    };

    // const actions = {
    //     label: 'Thao tác',
    //     width: 140,
    //     actions: [
    //         {
    //             icon: 'drive_file_rename_outline',
    //             onClick: (user: IUser) => {
    //                 navigate(`/user/edit/${user._id}`, { replace: true });
    //             },
    //         },
    //         {
    //             icon: 'delete_outline',
    //             color: 'error' as 'error',
    //             onClick: (user: IUser) => {
    //                 handleClickOpen(user);
    //             },
    //         },
    //         {
    //             icon: (user: IUser) =>
    //                 !!user.baned ? 'remove_moderator' : 'shield',
    //             onClick: (user: IUser) => {
    //                 onBanUser(user);
    //             },
    //         },
    //     ],
    // };
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
                >
                    Thêm
                </Button>
            </Toolbar>
            <SuperTable
                data={list}
                columns={columns}
                // actions={actions}
                hasIndex
            />
            <ConfirmDialog
                open={open}
                setOpen={setOpen}
                title="Bạn có chắc chắn muốn xóa người dùng này?"
                onOk={onDeleteUser}
            />
        </Grid>
    );
};

export default memo(ContentListView);
