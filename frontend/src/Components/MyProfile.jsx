import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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

const MyProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user profile data from the API using the user's token
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:4000/users/viewProfile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <StyledContainer>
      <h1>Profile</h1>
      {userData && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Place</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{userData.email}</TableCell>
                <TableCell>{userData.name}</TableCell>
                <TableCell>{userData.place}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </StyledContainer>
  );
};

export default MyProfile;
