import { useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './styles/theme';
import App from './App';
import { SnackbarProvider } from './context/SnackbarContext';

const Root = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <ThemeProvider theme={ darkMode ? darkTheme : lightTheme }>
      <SnackbarProvider>
        <CssBaseline/>
        <App darkMode={ darkMode } toggleTheme={ toggleTheme }/>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default Root;