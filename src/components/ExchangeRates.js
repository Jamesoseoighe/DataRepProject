import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExchangeRates = () => {
  const [rates, setRates] = useState({});
  const [base, setBase] = useState('USD');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/exchange-rates');
        setRates(response.data.rates);
        setBase(response.data.base);
      } catch (err) {
        console.error('Error fetching exchange rates:', err.message);
        setError('Failed to fetch exchange rates');
      }
    };

    fetchRates();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Exchange Rates (Base: {base})</h1>
      <ul>
        {Object.entries(rates).map(([currency, rate]) => (
          <li key={currency}>
            {currency}: {rate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExchangeRates;
