import React, { useState } from 'react';
import axios from 'axios';
import './BudgetTracker.css';

const ExpenseForm = ({ onExpenseAdded }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/expenses', {
        name,
        amount: parseFloat(amount),
        category,
      });
      onExpenseAdded(response.data); // Notify parent component about the new expense
      setName('');
      setAmount('');
      setCategory('');
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add New Expense</h2>
      <input
        type="text"
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
