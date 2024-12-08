import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BudgetTracker.css';


const ExpenseList = () => {
  const [expenses = [], setExpenses, onDeleteExpense, onEditExpense ] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/expenses');
        setExpenses(response.data.expenses);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Expense List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
       <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <strong>{expense.name}</strong> - ${expense.amount.toFixed(2)} ({expense.category})
            <button className="edit-button" onClick={() => onEditExpense(expense)}>Edit</button>
            <button className="delete-button" onClick={() => onDeleteExpense(expense._id)}>Delete</button>
           
          </li>
        ))}
      </ul>
      )}
    </div>
    
  );
};


export default ExpenseList;
