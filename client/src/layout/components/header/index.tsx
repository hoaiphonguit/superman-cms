import { memo, useContext } from 'react';
import { drawerWidth } from 'src/constants';
import { ColorModeContext } from 'src/layout';
import {
    Notifications as NotificationsIcon,
    Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon,
} from '@mui/icons-material';
import {
    AppBarProps,
    Badge,
    IconButton,
    AppBar as MuiAppBar,
    styled,
    Toolbar,
    useTheme,
} from '@mui/material';
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
