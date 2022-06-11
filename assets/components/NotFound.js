import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <Box textAlign="center">
            <Typography variant="h4">Page not found 404</Typography>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                    Go to home
                </Button>
            </NavLink>
        </Box>
    );
};

export default NotFound;
