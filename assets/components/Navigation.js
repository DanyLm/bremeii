import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@mui/material';

import {
    Menu as MenuIcon,
    List as ListIcon,
    Label as LabelIcon,
    Home as HomeIcon
} from '@mui/icons-material';

const sx = {
    menuIcon: {
        marginRight: theme => theme.spacing(2)
    },
    list: {
        width: theme => theme.spacing(30)
    },
    link: {
        textDecoration: 'none',
        color: theme => theme.palette.text.primary
    }
};

const Navigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawerItems = [
        {
            text: 'TodoList',
            icon: <ListIcon />,
            link: '/todo-list'
        },
        {
            text: 'Tags',
            icon: <LabelIcon />,
            link: '/tag-list'
        }
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        onClick={toggleDrawer}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TodoApp
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                <Drawer open={drawerOpen} onClose={toggleDrawer}>
                    <List sx={sx.list}>
                        <NavLink
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? 'red' : ''
                                };
                            }}
                            to="/"
                            sx={sx.link}
                            key="home"
                            end
                        >
                            <ListItem onClick={toggleDrawer} button>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </NavLink>
                        {drawerItems.map(({ text, icon, link }) => (
                            <NavLink
                                style={({ isActive }) => {
                                    return {
                                        color: isActive ? 'red' : 'inherit'
                                    };
                                }}
                                to={link}
                                sx={sx.link}
                                key={text}
                            >
                                <ListItem onClick={toggleDrawer} button>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            </NavLink>
                        ))}
                    </List>
                </Drawer>
            </AppBar>
        </Box>
    );
};

export default Navigation;
