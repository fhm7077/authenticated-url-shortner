import React from 'react';

const Home = () => {
  return (
    <div style={{ marginLeft: 50, padding: '20px' }}>
      <h1>Welcome to the Dashboard</h1>
      <img
        src="/arrow.png"  // Update with the correct path to your image
        alt="Welcome "
        style={{ maxWidth: '20%', height: 'auto', marginTop: '20px' }}
      />
    </div>
  );
};

export default Home;