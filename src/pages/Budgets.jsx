import React from 'react';
import { Button } from '@/components/ui/button';

const Budgets = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Budgets</h1>
      <Button>Create Budget</Button>
      {/* Budget list will be added here */}
    </div>
  );
};

export default Budgets;