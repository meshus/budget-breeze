import React from 'react';
import { Button } from '@/components/ui/button';

const Expenses = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Expense Tracking</h1>
      <Button>Add Expense</Button>
      {/* Expense list will be added here */}
    </div>
  );
};

export default Expenses;