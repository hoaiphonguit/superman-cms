import { Fragment, memo } from 'react';
import { INavigator } from 'src/interfaces';
import { useToggle } from 'react-use';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import {
    Collapse,
    Icon,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

const NavItem = ({
    icon,
    children,
    name,
    url,
    defaultExpand = false,
}: INavigator) => {
    const [open, setOpen] = useToggle(defaultExpand);
    return !children ? (
        <NavLink to={url || ''}>
            {({ isActive }) => (
                <ListItemButton sx={{ pl: 5 }} selected={isActive}>
                    <ListItemIcon>
                        <Icon>{icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={name} />
                </ListItemButton>
            )}
        </NavLink>
    ) : (
        <Fragment>
            <ListItemButton onClick={setOpen}>
                <ListItemIcon>
                    <Icon>{icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {children && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {children.map((item, i) => (
                            <NavLink to={item.url || ''} key={i}>
                                {({ isActive }) => (
                                    <ListItemButton
                                        sx={{ pl: 5 }}
                                        key={i}
                                        selected={isActive}
                                    >
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                )}
                            </NavLink>
                        ))}
                    </List>
                </Collapse>
            )}
        </Fragment>
    );
};

export default memo(NavItem);
