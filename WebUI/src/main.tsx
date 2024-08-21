import {CssBaseline, ThemeProvider} from '@mui/material';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import App from './App.tsx';
import {appTheme} from './config/theme.ts';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={appTheme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </StrictMode>
);
