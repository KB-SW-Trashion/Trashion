// import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import './Progressbar.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f8bbd0',
    },
  },
});

const Progessbar = () => {
  return (
    // <ThemeProvider theme={theme}>
    //   <CircularProgress color="primary" sx={{ size: 40 }} />
    // </ThemeProvider>
    <span className="loader"></span>
  );
};

export default Progessbar;
