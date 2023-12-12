// Login.js
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';


const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '600px',
  margin: 'auto',
  marginTop: '20px',
  border: '1px solid #ddd',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 255, 0.1)',
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
  width: '100%',
});

const StyledButton = styled(Button)({
  margin: 'auto',
  display: 'block',
});

const Login = () => { 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Login Success');
        console.log('Login successful:', data);
        localStorage.setItem('authToken', data.token);
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        alert('Invalid Credentials');
        console.error('Login failed:', errorData);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <StyledTextField
          label="Email"
          variant="outlined"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledTextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <StyledButton type="submit" variant="contained" color="primary">
          Login
        </StyledButton> 
      </form>

      <Typography variant="body2" color="textSecondary" align="center">
        Don't have an account? <a href="/register">Register here</a>.
      </Typography>
    </StyledContainer>
  );
};

export default Login;
