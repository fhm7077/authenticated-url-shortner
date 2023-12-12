import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const UrlList = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          console.log('No token provided')
          alert('Login to view your URLs')
          return;
        }

        const response = await fetch('http://localhost:4000/url/view-all', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUrls(data);
        } else {
          // Handle the case where the server responds with an error
          console.error('Error fetching URLs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    fetchUrls();
  }, []); // Run once when the component mounts

  return (
    <div>
      <h2>Your URLs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={'80'}>Sl. No.</TableCell>
              <TableCell width={'300'}>Shortened URL</TableCell>
              <TableCell>Original URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url, index) => (
              <TableRow key={url.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{url.shortUrl}</TableCell>
                <TableCell>
                  <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                    {url.originalUrl}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UrlList;
