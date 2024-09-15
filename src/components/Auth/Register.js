import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Paper, Avatar, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api'; 
import { PersonAdd } from '@mui/icons-material'; 

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    mobile: '', 
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (!form.name || !form.mobile || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
  
    // Prepare data to send by excluding confirmPassword
    const { confirmPassword, ...dataToSend } = form;

    try {
      const response = await api.post('https://user-management-nodejs-api.vercel.app/api/v1/auth/register', dataToSend); 
      if (response.data.status === 'failure') {
        setError(response.data.message || 'Registration failed. Please try again.');
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };
     
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={6} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <PersonAdd />
        </Avatar>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Box mb={3}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              size="small"
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              size="small"
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              size="small"
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              size="small"
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              size="small"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: '12px', fontSize: '16px' }}
          >
            Register
          </Button>
          <Box mt={2} textAlign="center">
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
