import React from 'react';
import { Button } from '@/components/ui/button';

const Income = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Income Tracking</h1>
      <Button>Add Income</Button>
      {/* Income list will be added here */}
    </div>
  );
};

export default Income;