import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || isNaN(amount)) {
      alert('Please enter valid expense details!');
      return;
    }
    onAddExpense({ name, amount: parseFloat(amount) });
    setName('');
    setAmount('');
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Expense Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g., Rent"
          />
        </div>
        <div>
          <label>Amount: </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="E.g., 500"
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
