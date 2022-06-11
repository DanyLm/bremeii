import React from 'react';
import {
    createTheme,
    StyledEngineProvider,
    ThemeProvider,
    CssBaseline,
    responsiveFontSizes
} from '@mui/material';
import PropTypes from 'prop-types';
import { lime, teal } from '@mui/material/colors';

const theme = responsiveFontSizes(
    createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: lime['700'],
                light: lime['100'],
                dark: lime['900']
            },
            secondary: {
                main: teal['700'],
                light: teal['100']
            }
        }
    })
);

const DefaultThemeProvider = props => (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    </StyledEngineProvider>
);

export default DefaultThemeProvider;

DefaultThemeProvider.propTypes = {
    children: PropTypes.element.isRequired
};
