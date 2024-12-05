import React from 'react';

const Home = () => {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const time = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Determine greeting based on time of day
  const getGreeting = () => {
    if (hours < 12) return 'Good Morning!';
    if (hours < 18) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>{getGreeting()}</h1>
      <p>Welcome to the Currency Exchange and Budget Tracker App!</p>
      <p>Track live exchange rates, manage your budget, and convert currencies effortlessly.</p>
      <p>It is currently {time}.</p>
    </div>
  );
};

export default Home;

