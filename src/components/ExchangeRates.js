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

const ExchangeRates = () => {
  const [rates, setRates] = useState({});
  const [base, setBase] = useState('USD');
  const [target, setTarget] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/exchange-rates');
        setRates(response.data.rates);
        setBase(response.data.base);
        setConvertedAmount(response.data.rates[target] * amount);
      } catch (err) {
        console.error('Error fetching exchange rates:', err.message);
        setError('Failed to fetch exchange rates');
      }
    };

    fetchRates();
  }, [amount, target]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTargetChange = (e) => {
    setTarget(e.target.value);
  };

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
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="amount">Amount: </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          style={{ marginRight: '10px' }}
        />
        <label htmlFor="target">Convert to: </label>
        <select id="target" value={target} onChange={handleTargetChange}>
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <p>
        {amount} {base} = {convertedAmount.toFixed(2)} {target}
      </p>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {Object.entries(rates).map(([currency, rate]) => (
          <li
            key={currency}
            style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
          >
            <img
              src={getFlagUrl(currency)}
              alt={`${currency} flag`}
              onError={(e) => (e.target.style.display = 'none')}
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
