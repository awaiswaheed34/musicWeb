import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { loginUser } from '../thunks/apiThunk';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  if (isAuthenticated) {
    toast.success('Already Logged in');
    navigate('/');
  }

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      await dispatch(loginUser(formData));
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          background: 'linear-gradient(to bottom, #000000, #00cc66, #000000)',
        }}
      >
        <Container component="main" maxWidth="xs" style={{ marginTop: '20px' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'black',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: 10,
              color: 'white',
            }}
          >
            <Typography variant="h4" component="div" gutterBottom>
              Login
            </Typography>

            <TextField
  variant="outlined"
  label="Username"
  fullWidth
  margin="normal"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  sx={{ backgroundColor: 'white', color: 'black' }}
/>

<TextField
  variant="outlined"
  label="Password"
  type="password"
  fullWidth
  margin="normal"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  sx={{ backgroundColor: 'white', color: 'black' }}
/>

            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#00cc66', color: 'white', '&:hover': { backgroundColor: '#333333' } }}
              onClick={handleLogin}
            >
              Login
            </Button>

            <Typography variant="body2" sx={{ marginTop: '8px', color: 'white' }}>
              Don't have an account? <Link to="/signup">Signup</Link>
            </Typography>
          </Box>
        </Container>
      </div>

      <Footer />

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
