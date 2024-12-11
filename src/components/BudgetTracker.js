import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import EditExpenseForm from './EditExpenseForm';
import './BudgetTracker.css'; // Styling for the Budget Tracker

const BudgetTracker = () => {
  const [expenses, setExpenses] = useState([]); // Stores all expenses
  const [name, setName] = useState(''); // Tracks the name input
  const [amount, setAmount] = useState(''); // Tracks the amount input
  const [category, setCategory] = useState(''); // Tracks the category input
  const [loading, setLoading] = useState(true); // Indicates if data is loading
  const [error, setError] = useState(null); // Stores any error messages
  const [editingExpense, setEditingExpense] = useState(null); // Expense being edited

  // Fetch expenses from the backend on component load
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/expenses');
        setExpenses(response.data); // Populate the state with expenses
        setLoading(false); // Mark loading as complete
      } catch (err) {
        console.error('Error fetching expenses:', err);
        setError('Failed to fetch expenses'); // Handle errors
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []); // Dependency array ensures this runs only once

  // Add a new expense to the backend and update the state
  const handleAddExpense = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    if (!name || !amount || !category) {
      alert('Please fill in all fields'); // Ensure all fields are completed
      return;
    }

    try {
      const newExpense = { name, amount: parseFloat(amount), category };
      const response = await axios.post('http://localhost:4000/api/expenses', newExpense);
      setExpenses((prevExpenses) => [...prevExpenses, response.data]); // Append new expense
      setName(''); // Reset input fields
      setAmount('');
      setCategory('');
    } catch (err) {
      console.error('Error adding expense:', err);
      alert('Failed to add expense'); // Handle errors
    }
  };

  // Refresh expenses after a successful update
  const handleUpdateSuccess = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/expenses');
      setExpenses(response.data); // Update the state with fresh data
      setEditingExpense(null); // Close the edit form
    } catch (err) {
      console.error('Error refreshing expenses:', err);
    }
  };

  // Open the edit form for a specific expense
  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  // Cancel editing and close the edit form
  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  // Delete an expense from the backend and update the state
  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/expenses/${id}`);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id)); // Remove deleted expense
    } catch (err) {
      console.error('Error deleting expense:', err);
      alert('Failed to delete expense');
    }
  };

  // Calculate the total amount of expenses
  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2);
  };

  return (
    <div className="budget-tracker">
      <h1>Budget Tracker</h1>

      {/* Conditionally render Add or Edit Form */}
      {editingExpense ? (
        <EditExpenseForm
          expenseToEdit={editingExpense}
          onUpdateSuccess={handleUpdateSuccess}
          onCancel={handleCancelEdit}
        />
      ) : (
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
      )}

      {/* List of Expenses */}
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
                <button onClick={() => handleEditExpense(expense)}>Edit</button>
                <button onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display Total Expenses */}
      <div className="total-expenses">
        <h3>Total Expenses: ${calculateTotal()}</h3>
      </div>
    </div>
  );
};

export default BudgetTracker;
