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
      <div style={{ marginTop: '40px' }}>
      <h3>Frequently Asked Questions</h3>
      <details>
        <summary>How do I add an expense?</summary>
        <p>Navigate to the Budget Tracker page and fill in the expense form.</p>
      </details>
      <details>
        <summary>Can I edit or delete expenses?</summary>
        <p>Yes, use the Edit or Delete buttons next to each expense in the list.</p>
      </details>
    </div>
    </div>
  );
};

export default Home;
