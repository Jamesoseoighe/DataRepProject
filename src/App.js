import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/footer';
import Content from './components/content';
import Read from './components/read';
import Create from './components/create';
import Edit from './components/edit';
import ExchangeRates from './components/ExchangeRates';
import BudgetTracker from './components/BudgetTracker';
import Home from './components/home';

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Define Routes */}
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/read" element={<Read />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/exchange-rates" element={<ExchangeRates />} />
        <Route path="/budget-tracker" element={<BudgetTracker />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
