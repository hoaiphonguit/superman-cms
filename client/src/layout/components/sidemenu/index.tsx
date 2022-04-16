import { memo } from 'react';
import { drawerWidth } from 'src/constants';
import Itemlist from './itemlist';
import { useAsync } from 'react-use';
import { INavigator } from 'src/interfaces';
import { AppService } from 'src/modules/app';
import { Link } from 'react-router-dom';
import {
    Divider,
    Drawer as MuiDrawer,
    styled,
    Toolbar,
    Typography,
} from '@mui/material';

const Drawer = styled(MuiDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        width: drawerWidth,
        a: {
            textDecoration: 'none',
            color: 'inherit',
            width: '100%',
            '&.active': {
                color: theme.palette.primary,
            },
        },
    },
}));

const SideMenu = () => {
    const state = useAsync(AppService.appConfig);
    const list: INavigator[] = state.value?.list || [];

    return (
        <Drawer variant="permanent" open={true}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    <Link to="/">
                        <img src="/images/superman_icon.png" width={60} />
                    </Link>
                </Typography>
            </Toolbar>
            <Divider />
            {list
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((navigation, i) => (
                    <Itemlist key={i} {...navigation} />
                ))}
        </Drawer>
    );
};

export default memo(SideMenu);
