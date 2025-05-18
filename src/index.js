import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light', // you can switch to 'dark' if you want
    primary: {
      main: '#1976d2', // MUI blue
    },
    secondary: {
      main: '#f50057', // MUI pink
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize CSS */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
