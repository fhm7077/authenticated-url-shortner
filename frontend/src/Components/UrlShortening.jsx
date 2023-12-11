import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import CopyToClipboard from 'react-copy-to-clipboard';

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

const UrlShortening = () => {
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    // Reset the copy state after 3 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the token from local storage
    const token = localStorage.getItem('authToken');

    // Make sure there is a token
    if (!token) {
      alert('Login to use URL Shortening');
      console.error('No token found');
      return;
    }

    try {
      // Make the API request with the token in the headers
      const response = await fetch('http://localhost:4000/url/short-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          originalUrl: inputUrl,
        }),
      });

      const data = await response.json();

      // Handle the response data accordingly
      setShortenedUrl(data.shortUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <StyledContainer>
      <div>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Original URL:"
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <StyledButton type="submit" variant="contained" color="primary">
            Shorten URL
          </StyledButton>
        </form>

        {shortenedUrl && (
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
                style={{ color: 'red', marginBottom: '8px', fontWeight: 'bold' }}
              >
                Shortened URL:
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
                  {shortenedUrl}
                </Typography>
              </div>
            </div>
            <CopyToClipboard text={shortenedUrl} onCopy={handleCopy}>
              <Button variant="outlined" color="primary" style={{ marginTop: '30px' }}>
                {isCopied ? 'Copied!' : 'Copy to Clipboard'}
              </Button>
            </CopyToClipboard>
          </div>
        )}
      </div>
    </StyledContainer>
  );
};

export default UrlShortening;
