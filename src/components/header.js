import React from 'react';

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>
        Financial Tracker <span role="img" aria-label="graph">📊</span>
      </h1>
    </header>
  );
};

// Styles for the Header
const headerStyle = {
  backgroundColor: '#007bff',
  color: '#ffffff',
  padding: '20px 10px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
  fontSize: '1.8em',
  margin: 0,
  fontFamily: 'Arial, sans-serif',
};

export default Header;
