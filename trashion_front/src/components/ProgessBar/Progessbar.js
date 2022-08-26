import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f8bbd0',
    },
  },
});

const Progessbar = () => {
  return (
    <ThemeProvider theme={theme}>
      <LinearProgress color="primary" />
    </ThemeProvider>
  );
};

export default Progessbar;
