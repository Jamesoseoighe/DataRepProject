import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const time = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Determine greeting based on time of day
  const getGreeting = () => {
    if (hours < 12) return 'Good Morning!';
    if (hours < 18) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{getGreeting()}</h1>
      <p style={{ fontSize: '1.2em' }}>Welcome to the Currency Exchange and Budget Tracker App!</p>
      <p>Track live exchange rates, manage your budget, and convert currencies effortlessly.</p>

      <p style={{ fontSize: '1.1em', fontWeight: 'bold' }}>It is currently {time}.</p>

      <div style={{ marginTop: '30px', fontSize: '1.2em' }}>
        <p>Total Expenses: <strong>$450.00</strong></p>
        <p>Top Spending Category: <strong>Food</strong></p>
      </div>

      {/* Navigation Links */}
      <div style={{ marginTop: '30px' }}>
        <Link
          to="/budget-tracker"
          style={{
            marginRight: '15px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
        >
          Go to Budget Tracker
        </Link>
        <Link
          to="/charts"
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
        >
          View Charts
        </Link>
      </div>
    </div>
  );
};

export default Home;
