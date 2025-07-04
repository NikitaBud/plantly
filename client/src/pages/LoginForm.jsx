import { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { login } from '../services/authService';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await login(formData);

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  }

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column', maxWidth: 400, mx: 'auto', mt: 5 } }>
      <Typography variant="h5" align="center" gutterBottom>
        Sign in
      </Typography>

      { error && (
        <Typography color="error" align="center" sx={ { mb: 2 } }>
          { error }
        </Typography>
      ) }

      <form onSubmit={ handleSubmit }>
        <Grid container direction="column" spacing={ 2 }>
          <Grid item xs={ 12 }>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              value={ formData.email }
              onChange={ handleChange }
            />
          </Grid>
          <Grid item xs={ 12 }>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              value={ formData.password }
              onChange={ handleChange }
            />
          </Grid>
          <Grid item xs={ 12 }>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign in
            </Button>
            <p style={ { textAlign: 'center' } }>
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default LoginForm;