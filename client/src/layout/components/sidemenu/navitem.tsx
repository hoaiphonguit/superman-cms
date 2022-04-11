import { Fragment, memo } from 'react';
import { INavigator } from 'src/interfaces/app';
import Icon from '@mui/material/Icon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useToggle } from 'react-use';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { NavLink } from 'react-router-dom';

const NavItem = ({ icon, children, name }: INavigator) => {
    const [open, setOpen] = useToggle(false);
    return (
        <Fragment>
            <ListItemButton onClick={setOpen}>
                <ListItemIcon>
                    <Icon>{icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children?.map((item, i) => (
                        <NavLink to={item.url || ''}>
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
        </Fragment>
    );
};

export default memo(NavItem);
