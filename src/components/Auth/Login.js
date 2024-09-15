import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { TextField, Button, Box, Container, Typography, Paper, Avatar, Link } from '@mui/material';
import { LockOutlined as LockIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [error, setError] = useState(null); 

  // Function to handle login
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('https://user-management-nodejs-api.vercel.app/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (result.code == 200) {
        localStorage.setItem('token', JSON.stringify(result.data[0].token));
        localStorage.setItem('role', JSON.stringify(result.data[0].role));
        localStorage.setItem('isAdmin', JSON.stringify(result.data[0].isAdmin));
        localStorage.setItem('userId', JSON.stringify(result.data[0].id));
        setTimeout(() => {
          navigate("/profile");
        }, 100); 
      }
    } catch (error) {
      setError('An error occurred during login error.');
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(email, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 4, marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Sign in</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link href="#" variant="body2">Forgot password?</Link>
            <Link
              href="/register"
              variant="body2"
              component={Link} 
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
