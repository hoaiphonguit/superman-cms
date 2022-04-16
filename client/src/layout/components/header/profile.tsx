import {
    Avatar,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
} from '@mui/material';
import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'src/redux/selectors/auth';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AuthService from 'src/modules/auth/service';
import { useNavigate } from 'react-router-dom';
import { setAuth } from 'src/redux/actions/auth';
import { IUser } from 'src/interfaces';

const Profile = () => {
    const user = useSelector(userSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        const resp = await AuthService.logoutUser();
        // tslint:disable-next-line: no-console
        console.log('resp', resp);
        if (resp.success) {
            dispatch(setAuth({ isAuthenticated: false, user: {} as IUser }));
            navigate('/', { replace: true });
        }
    };

    const open = Boolean(anchorEl);
    return (
        <>
            <IconButton color="inherit" sx={{ ml: 1 }} onClick={handleClick}>
                <Avatar
                    src={user.avatar || ''}
                    sx={{ width: 30, height: 30 }}
                />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar /> {user.name}
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};
export default memo(Profile);
