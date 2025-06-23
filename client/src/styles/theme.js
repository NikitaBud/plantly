import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: green[700],
    },
    secondary: {
      main: green[300],
    },
    background: {
      default: '#f0fdf4',
      paper: '#ffffff',
    }
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: green[300],
    },
    secondary: {
      main: green[700],
    },
    background: {
      default: '#102a12',
      paper: '#1e3815',
    }
  }
})