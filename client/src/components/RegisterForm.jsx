import { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Something went wrong');
      }

      alert(`User registered successfully. Welcome, ${data.user.name}!`);
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
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default RegisterForm;