import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '700px',
  margin: 'auto',
  marginTop: '80px',
  border: '1px solid #ddd',
  padding: '40px',
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

const RedirectUrl = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');

  const handleOpen = () => {
    // Open the original URL in a new tab or window
    window.open(originalUrl, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API request to get the original URL
      const response = await fetch(
        `http://localhost:4000/url/redirect?shortUrl=${inputUrl}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        // Set the original URL in state
        setOriginalUrl(data.originalUrl);
      } else {
        const errorData = await response.json();
        if (response.status === 404 && errorData.message === 'Shortened URL not found') {
            // Handle 404 error for Shortened URL not found
            alert('Shortened URL not found. Please check the URL and try again.');
          } else {
            // Handle other errors
            console.error('Error:', response.status, errorData.message);
          }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <StyledContainer>
      <h1>Get original URL</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Shortened URL:"
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            required
          />
          <StyledButton type="submit" variant="contained" color="primary">
            Redirect
          </StyledButton>
        </form>

        {originalUrl && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '50px',
              padding: '16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              marginTop: '25px',
            }}
          >
            <div style={{ flex: 1 }}>
              <Typography
                component="p"
                variant="body1"
                style={{
                  color: 'red',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                }}
              >
                Original URL:
              </Typography>
              <div
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '8px',
                  backgroundColor: '#f8f8f8',
                  overflowWrap: 'break-word',
                }}
              >
                <Typography component="div" variant="body1">
                  {originalUrl}
                </Typography>
              </div>
            </div>
            {/* <CopyToClipboard text={originalUrl} onCopy={handleOpen}> */}
              <Button
                variant="outlined"
                color="primary"
                style={{ marginTop: '30px' }}
                onClick={handleOpen}
              >
                CLICK TO OPEN
              </Button>
            {/* </CopyToClipboard> */}
          </div>
        )}
      </div>
    </StyledContainer>
  );
};

export default RedirectUrl;
