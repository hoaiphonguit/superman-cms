import { memo } from 'react';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import { useAsync } from 'react-use';
import UserService from '../../service';
import SuperTable from 'src/components/table';
import { IColumn } from 'src/interfaces/table';
import { IUser } from 'src/interfaces';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { NavLink, useNavigate } from 'react-router-dom';

const columns: IColumn<IUser>[] = [
    { id: 'username', label: 'Tên người dùng' },
    { id: 'name', label: 'Họ và tên' },
    { id: 'phone', label: 'SĐT' },
    { id: 'lastLogin', label: 'Đăng nhập cuối' },
];

const UserListView = () => {
    const state = useAsync(UserService.getList);
    const list = state.value?.list || [];
    const navigate = useNavigate();

    const actions = {
        label: 'Thao tác',
        actions: [
            {
                icon: 'drive_file_rename_outline',
                onClick: (user: IUser) => {
                    navigate(`/user/edit/${user._id}`, { replace: true });
                },
            },
        ],
    };
    return (
        <Grid item xs={12}>
            <Toolbar>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Danh sách người dùng
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />}>
                    <NavLink to="/user/add">Thêm</NavLink>
                </Button>
            </Toolbar>
            <SuperTable
                data={list}
                columns={columns}
                actions={actions}
                hasIndex
            />
        </Grid>
    );
};

export default memo(UserListView);
