import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';


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

const Register = () => {
  const initialFormData = {
    email: '',
    password: '',
    name: '',
    place: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [openPopup, setOpenPopup] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePopupClose = () => {
    setOpenPopup(false);
    window.location.href = '/login';
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    navigate('/login');
    e.preventDefault();
    console.log('Handling submit...');

    try {
      // Make a registration request to the NestJS API
      const response = await axios.post('http://localhost:4000/users/register', formData);
      console.log(response.data); // Handle the response as needed

      // Show the success popup
      setOpenPopup(true);

      // Clear the form data after successful registration
      setFormData(initialFormData);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <StyledContainer>
      <h1>Sign Up..</h1>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          label="Email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          required
        />
        <StyledTextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          required
        />
        <StyledTextField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          required
        />
        <StyledTextField
          label="Place"
          type="text"
          name="place"
          value={formData.place}
          onChange={handleChange}
          variant="outlined"
          required
        />
        <StyledButton type="submit" variant="contained" color="primary">
          Register
        </StyledButton>
      </form>

      {/* Success Popup */}
      <Dialog open={openPopup} onClose={handlePopupClose}>
        <DialogTitle>Succesfully Registered!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have successfully registered. Click below to log in.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopupClose} color="primary" autoFocus>
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default Register;
