import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
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
              {expense.name} - ${expense.amount} ({expense.category})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
