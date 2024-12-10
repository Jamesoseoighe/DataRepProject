import React from 'react';
import TopExpenseCategoriesChart from './TopExpenseCategoriesChart';
import PieChartComponent from './PieChartComponent';

const TopChartsPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Expense Insights</h1>
      <div style={{ marginBottom: '50px' }}>
        <TopExpenseCategoriesChart />
      </div>
      <div>
        <PieChartComponent />
      </div>
    </div>
  );
};

export default TopChartsPage;
