import React from 'react';
import { Progress } from '@/components/ui/progress';

const Savings = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Savings Goals</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Current Goal: $1000</h2>
        <Progress value={30} className="w-full" />
        <p className="mt-2">$300 saved of $1000 goal</p>
      </div>
      {/* Add savings goal form will be added here */}
    </div>
  );
};

export default Savings;