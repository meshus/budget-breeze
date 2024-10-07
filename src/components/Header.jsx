import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">FinanceTracker</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/dashboard"><Button variant="ghost">Dashboard</Button></Link></li>
            <li><Link to="/income"><Button variant="ghost">Income</Button></Link></li>
            <li><Link to="/expenses"><Button variant="ghost">Expenses</Button></Link></li>
            <li><Link to="/savings"><Button variant="ghost">Savings</Button></Link></li>
            <li><Link to="/budgets"><Button variant="ghost">Budgets</Button></Link></li>
            <li><Link to="/reports"><Button variant="ghost">Reports</Button></Link></li>
            <li><Link to="/register"><Button variant="ghost">Register</Button></Link></li>
            <li><Link to="/login"><Button variant="ghost">Login</Button></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;