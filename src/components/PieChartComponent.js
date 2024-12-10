import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import axios from 'axios';


const PieChartComponent = () => {
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
          name: category,
          value: total,
        }));

        setCategoriesData(formattedData);
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    };

    fetchExpenses();
  }, []);

  const COLORS = ['#007bff', '#dc3545', '#ffc107', '#28a745', '#6610f2']; // Add more colors if needed

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>Expense Distribution</h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={categoriesData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {categoriesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
