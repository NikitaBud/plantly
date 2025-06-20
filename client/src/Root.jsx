import { useEffect, useState } from 'react';
import { Button, CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './styles/theme';
import App from './App';

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
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Button
          variant="contained"
          onClick={toggleTheme}
          sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1300 }}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
        <App />
      </ThemeProvider>
  )
}

export default Root;