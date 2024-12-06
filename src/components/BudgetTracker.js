import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BudgetTracker.css'; // Optional: Add your styling here

const BudgetTracker = () => {
  const [expenses, setExpenses] = useState([]); // State to manage expenses
  const [name, setName] = useState(''); // Expense name input
  const [amount, setAmount] = useState(''); // Expense amount input
  const [category, setCategory] = useState(''); // Expense category input
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch expenses from the backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/expenses');
        setExpenses(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching expenses:', err);
        setError('Failed to fetch expenses');
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Handle adding a new expense
  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!name || !amount || !category) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const newExpense = { name, amount: parseFloat(amount), category };
      const response = await axios.post('http://localhost:4000/api/expenses', newExpense);
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
      setName('');
      setAmount('');
      setCategory('');
    } catch (err) {
      console.error('Error adding expense:', err);
      alert('Failed to add expense');
    }
  };

  // Handle deleting an expense
  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/expenses/${id}`);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
      alert('Failed to delete expense');
    }
  };

  // Calculate the total expenses
  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2);
  };

  return (
    <div className="budget-tracker">
      <h1>Budget Tracker</h1>

      {/* Expense Form */}
      <form className="expense-form" onSubmit={handleAddExpense}>
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

      {/* Expense List */}
      <div className="expense-list">
        <h2>Expenses</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : expenses.length === 0 ? (
          <p>No expenses added yet</p>
        ) : (
          <ul>
            {expenses.map((expense) => (
              <li key={expense._id}>
                <strong>{expense.name}</strong> - ${expense.amount.toFixed(2)} ({expense.category})
                <button onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total Expenses */}
      <div className="total-expenses">
        <h3>Total Expenses: ${calculateTotal()}</h3>
      </div>
    </div>
  );
};

export default BudgetTracker;
