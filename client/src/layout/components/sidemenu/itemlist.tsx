import { memo } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { INavigator } from 'src/interfaces/app';
import { styled } from '@mui/material/styles';
import NavItem from './navitem';

const SuperNav = styled(List)<{ component?: React.ElementType }>({
    '& .MuiListSubheader-root': {
        textTransform: 'uppercase',
    },
    '& .MuiListItemButton-root': {
        paddingLeft: 12,
        paddingRight: 12,
    },
    '& .MuiCollapse-root .MuiListItemButton-root': { paddingLeft: 56 },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 20,
    },
});

const ItemList = ({ name, children = [] }: INavigator) => {
    return (
        <SuperNav
            component="nav"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    {name}
                </ListSubheader>
            }
        >
            {children
                ?.sort((a, b) => (b.order || 0) - (a.order || 0))
                .map((navigaiton, i) => {
                    return <NavItem {...navigaiton} key={i} />;
                })}
        </SuperNav>
    );
};

export default memo(ItemList);
