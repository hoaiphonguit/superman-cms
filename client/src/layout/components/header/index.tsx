import { memo, useContext } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { drawerWidth } from 'src/constants';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from 'src/layout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Profile from './profile';

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    '& .MuiToolbar-root': {
        justifyContent: 'right',
    },
    a: {
        display: 'flex',
    },
}));

const Header = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    return (
        <AppBar position="absolute">
            <Toolbar
                sx={{
                    pr: '24px',
                }}
            >
                <IconButton
                    onClick={() => colorMode.toggleColorMode()}
                    color="inherit"
                >
                    {theme.palette.mode === 'dark' ? (
                        <Brightness7Icon />
                    ) : (
                        <Brightness4Icon />
                    )}
                </IconButton>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Profile />
            </Toolbar>
        </AppBar>
    );
};

export default memo(Header);
