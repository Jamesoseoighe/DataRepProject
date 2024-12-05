import React, { useState, useEffect } from 'react';
import axios from 'axios';

const flagMapping = {
  EUR: 'eu',
  USD: 'us',
  GBP: 'gb',
  INR: 'in',
  JPY: 'jp',
  AUD: 'au',
  CAD: 'ca',
  CNY: 'cn',
};

const ExchangeRates = () => {
  const [rates, setRates] = useState({});
  const [target, setTarget] = useState('EUR'); // Default target currency
  const [amount, setAmount] = useState(1); // Amount in USD
  const [convertedAmount, setConvertedAmount] = useState(null); // Conversion result
  const [isLoading, setIsLoading] = useState(false); // Loading state for fetching rates
  const [error, setError] = useState(null);

  // Fetch exchange rates (always using USD as the base currency)
  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get('http://localhost:4000/api/exchange-rates'); // No need for base parameter
        setRates(response.data.rates);
        setIsLoading(false); // Stop loading
      } catch (err) {
        console.error('Error fetching exchange rates:', err.message);
        setError('Failed to fetch exchange rates');
        setIsLoading(false); // Stop loading even on error
      }
    };

    fetchRates();
  }, []);

  // Handle conversion when button is clicked
  const handleConvert = () => {
    if (target === 'USD') {
      setConvertedAmount(amount); // No conversion needed for USD
    } else if (rates[target]) {
      const conversionRate = rates[target]; // Directly use the rate for the target currency
      setConvertedAmount(amount * conversionRate);
    } else {
      setConvertedAmount(0); // Default to 0 if no rate is available
    }
  };

  const handleAmountChange = (e) => setAmount(parseFloat(e.target.value) || 0);
  const handleTargetChange = (e) => setTarget(e.target.value);

  const getFlagUrl = (currencyCode) => {
    const countryCode = flagMapping[currencyCode] || currencyCode.slice(0, 2).toLowerCase();
    return `https://flagcdn.com/w40/${countryCode}.png`;
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Currency Converter</h1>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="amount">Amount (USD): </label>
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

        <button
          onClick={handleConvert}
          style={{ marginLeft: '10px', padding: '5px 10px' }}
          disabled={isLoading} // Disable button while fetching rates
        >
          {isLoading ? 'Loading...' : 'Convert'}
        </button>
      </div>

      {/* Show conversion result only when convertedAmount is not null */}
      {convertedAmount !== null && (
        <p>
          {amount} USD = {convertedAmount.toFixed(2)} {target}
        </p>
      )}

      <h2>Exchange Rates</h2>
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
