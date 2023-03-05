import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, Toolbar, Typography } from '@mui/material';
import { memo, useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAsyncFn } from 'react-use';
import { ConfirmDialog, RequestAlert, SuperTable } from 'src/components';
import { IUser } from 'src/interfaces';
import { UserService } from 'src/modules/user';
import { actions, columns } from './config';

const UserListView = () => {
    const [state, stateFn] = useAsyncFn(UserService.getList);
    const [updateState, uppdateFn] = useAsyncFn(UserService.update);
    const [deleteState, deleteFn] = useAsyncFn(UserService.delete);
    const list = state.value?.list || [];
    const navigate = useNavigate();
    const [openDelete, setDeleteOpen] = useState(false);
    const [currUser, setCurrUser] = useState<IUser>();

    useEffect(() => {
        stateFn();
    }, []);

    const handleDelete = (user: IUser) => {
        setDeleteOpen(true);
        setCurrUser(user);
    };

    const onDeleteUser = async () => {
        if (currUser) {
            deleteFn(currUser._id);
        }
    };

    const hanldeEdit = (user: IUser) => {
        navigate(`/user/edit/${user._id}`, { replace: true });
    };

    const onBanUser = async (user: IUser) => {
        if (user) {
            uppdateFn(user._id, {
                ...user,
                baned: !!user.baned ? 0 : 1,
            });
        }
    };

    useEffect(() => {
        if (updateState.value) {
            stateFn();
        }
    }, [updateState, deleteState]);

    useEffect(() => {
        if (deleteState.value) {
            setDeleteOpen(false);
            setCurrUser(undefined);
            stateFn();
        }
    }, [deleteState]);

    const actionsConfig = useMemo(() => {
        return actions(hanldeEdit, handleDelete, onBanUser);
    }, []);

    return (
        <>
            {updateState?.value && <RequestAlert {...updateState.value} />}
            {deleteState?.value && <RequestAlert {...deleteState.value} />}
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
                    setOpen={setDeleteOpen}
                    title="Bạn có chắc chắn muốn xóa người dùng này?"
                    onOk={onDeleteUser}
                />
            </Grid>
        </>
    );
};

export default memo(UserListView);
