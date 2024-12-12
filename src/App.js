import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/footer';
import ExchangeRates from './components/ExchangeRates';
import BudgetTracker from './components/BudgetTracker';
import Home from './components/home';
import Header from './components/Header'; // Correct Import
import TopChartsPage from './components/TopChartsPage';

function App() {
  return (
    <Router>
      <Header/> {/* Add Header here */}
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Define Routes */}
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} /> //starts on /home instead of 
        <Route path="/Home" element={<Home />} />
        <Route path="/exchange-rates" element={<ExchangeRates />} />
        <Route path="/budget-tracker" element={<BudgetTracker />} />
        <Route path="/charts" element={<TopChartsPage />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
