import { Dispatch, memo, SetStateAction } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import { drawerWidth } from 'src/constants';

import Itemlist from './itemlist';
import { useAsync } from 'react-use';
import { INavigator } from 'src/interfaces/app';
import AppService from 'src/modules/app/service';

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
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

interface IProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
const SideMenu = ({ open, setOpen }: IProps) => {
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const state = useAsync(AppService.appConfig);
    const list: INavigator[] = state.value?.list || [];

    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
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
