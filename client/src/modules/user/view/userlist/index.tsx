import { memo, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import { useAsyncFn } from 'react-use';
import UserService from '../../service';
import SuperTable from 'src/components/table';
import { IColumn } from 'src/interfaces/table';
import { IUser } from 'src/interfaces';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ConfirmDialog from 'src/components/ConfirmDialog';
import { format } from 'date-fns';

const columns: IColumn<IUser>[] = [
    { id: 'username', label: 'Tên người dùng' },
    { id: 'name', label: 'Họ và tên' },
    { id: 'phone', label: 'SĐT' },
    {
        id: 'lastActivity',
        label: 'Hoạt động cuối',
        format: (value) =>
            value > 0 ? format(value, 'yyyy-MM-dd HH:mm:ss') : '',
    },
];

const UserListView = () => {
    const [state, stateFn] = useAsyncFn(UserService.getList);
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

    const actions = {
        label: 'Thao tác',
        width: 140,
        actions: [
            {
                icon: 'drive_file_rename_outline',
                onClick: (user: IUser) => {
                    navigate(`/user/edit/${user._id}`, { replace: true });
                },
            },
            {
                icon: 'delete_outline',
                color: 'error' as 'error',
                onClick: (user: IUser) => {
                    handleClickOpen(user);
                },
            },
            {
                icon: (user) => (!!user.baned ? 'remove_moderator' : 'shield'),
                onClick: (user: IUser) => {
                    onBanUser(user);
                },
            },
        ],
    };
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
                actions={actions}
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

export default memo(UserListView);
