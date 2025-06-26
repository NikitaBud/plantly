import { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import axios from '../services/axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/auth/register', formData);

      navigate('/dashboard');
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              >
              Register
            </Button>
            <p style={{ textAlign: 'center' }}>
              Уже есть аккаунт? <Link to="/login">Войти</Link>
            </p>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default RegisterForm;