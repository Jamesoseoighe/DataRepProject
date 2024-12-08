import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BudgetTracker.css';

const EditExpenseForm = ({ expenseToEdit, onUpdateSuccess, onCancel }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  // Populate the form with the existing expense details
  useEffect(() => {
    if (expenseToEdit) {
      setName(expenseToEdit.name);
      setAmount(expenseToEdit.amount);
      setCategory(expenseToEdit.category);
    }
  }, [expenseToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedExpense = { name, amount: parseFloat(amount), category };
      await axios.put(`http://localhost:4000/api/expenses/${expenseToEdit._id}`, updatedExpense);
      onUpdateSuccess(); // Refresh the list and exit edit mode
    } catch (err) {
      console.error('Error updating expense:', err);
    }
  };
  

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Edit Expense</h2>
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
      <button type="submit">Update Expense</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditExpenseForm;
