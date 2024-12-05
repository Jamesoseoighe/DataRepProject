import React, { useState } from 'react';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';

const BudgetTracker = () => {
  const [expenses, setExpenses] = useState([]); // Manage expenses

  // Add a new expense to the state
  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  // Calculate the total expenses
  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Budget Tracker</h1>
      <ExpenseForm onAddExpense={addExpense} />
      <ExpenseList expenses={expenses} />
      <div style={{ marginTop: '20px', fontSize: '1.2em' }}>
        <strong>Total Expenses:</strong> ${calculateTotal().toFixed(2)}
      </div>
    </div>
  );
};

export default BudgetTracker;
