import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const TopExpenseCategoriesChart = () => {
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/expenses'); // Replace with your API
        const expenses = response.data;

        // Aggregate expenses by category
        const categoryTotals = expenses.reduce((acc, expense) => {
          acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
          return acc;
        }, {});

        // Format data for Recharts
        const formattedData = Object.entries(categoryTotals).map(([category, total]) => ({
          category,
          total,
        }));

        setCategoriesData(formattedData);
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <h2>Top Expense Categories</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart layout="vertical" data={categoriesData}>
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" width={150} />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopExpenseCategoriesChart;
