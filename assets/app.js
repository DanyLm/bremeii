import './styles/app.css';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Personalized components
import Router from './components/Router';
import DefaultThemeProvider from './components/themes/DefaultThemeProvider';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

class App extends React.Component {
    render() {
        return (
            <DefaultThemeProvider>
                <Router />
            </DefaultThemeProvider>
        );
    }
}

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
