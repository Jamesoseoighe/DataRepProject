
import { Link } from 'react-router-dom';
import React from 'react';

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/Home">Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
           
           
            <li className="nav-item">
              <Link className="nav-link" to="/exchange-rates">Exchange Rates</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/budget-tracker">Budget Tracker</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/charts">Charts</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;