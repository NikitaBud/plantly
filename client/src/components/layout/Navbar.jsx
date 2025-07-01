import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Tooltip,
} from '@mui/material';
import { Brightness4, Brightness7, Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../services/authService';

const Navbar = ({ darkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar sx={ { justifyContent: 'space-between' } }>
        <Typography variant="h6" component="div">
          <Link to="/" style={ { color: 'inherit', textDecoration: 'none' } }>
            🌿 Plantly
          </Link>
        </Typography>

        { isAuthenticated && (
          <>
            <Box sx={ { display: 'flex', gap: 2 } }>
              <Button color="inherit" component={ Link } to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={ Link } to="/species">
                Catalog
              </Button>

              <Tooltip title="Toggle Theme">
                <IconButton onClick={ toggleTheme } color="inherit">
                  { darkMode ? <Brightness7/> : <Brightness4/> }
                </IconButton>
              </Tooltip>

              <Tooltip title="Logout">
                <IconButton onClick={ handleLogout } color="inherit">
                  <Logout/>
                </IconButton>
              </Tooltip>
            </Box>
          </>
        ) }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
