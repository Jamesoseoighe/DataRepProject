import React from 'react';

const ExpenseList = ({ expenses }) => {
  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <strong>{expense.name}:</strong> ${expense.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
