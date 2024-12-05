import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Flag mapping for valid currencies or special cases
const flagMapping = {
  EUR: 'eu', // European Union
  USD: 'us', // United States
  GBP: 'gb', // Great Britain
  INR: 'in', // India
  JPY: 'jp', // Japan
  AUD: 'au', // Australia
  CAD: 'ca', // Canada
  CNY: 'cn', // China
};

// List of unsupported currencies that won't display
const unsupportedCurrencies = ['XAF', 'XDR', 'ANG', 'ACD','XCD','XOF','XPF'];

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

  // Helper function to get the flag URL
  const getFlagUrl = (currencyCode) => {
    const countryCode = flagMapping[currencyCode] || currencyCode.slice(0, 2).toLowerCase();
    return `https://flagcdn.com/w40/${countryCode}.png`;
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Exchange Rates (Base: {base})</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {Object.entries(rates)
          .filter(([currency]) => !unsupportedCurrencies.includes(currency)) // Exclude unsupported currencies
          .map(([currency, rate]) => (
            <li
              key={currency}
              style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
            >
              <img
                src={getFlagUrl(currency)}
                alt={`${currency} flag`}
                onError={(e) => (e.target.style.display = 'none')} // Hide image if it fails to load
                style={{ width: '30px', height: '20px', marginRight: '10px', borderRadius: '3px' }}
              />
              <span>{currency}: {rate.toFixed(2)}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ExchangeRates;
