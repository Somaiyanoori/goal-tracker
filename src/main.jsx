import React from 'react';
import ReactDom from "react-dom/client";
import App from './App.jsx';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import createAppTheme from "./theme/theme.js";
const theme = createAppTheme("light", "ltr"); 

ReactDom.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <App/>
  </ThemeProvider>
)
