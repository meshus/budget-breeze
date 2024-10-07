import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const savingsGoalSchema = z.object({
  goalAmount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Goal amount must be a positive number",
  }),
  currentAmount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
    message: "Current amount must be a non-negative number",
  }),
});

const Savings = () => {
  const [savingsGoal, setSavingsGoal] = useState(null);

  const form = useForm({
    resolver: zodResolver(savingsGoalSchema),
    defaultValues: {
      goalAmount: '',
      currentAmount: '',
    },
  });

  const onSubmit = (data) => {
    const newSavingsGoal = {
      goalAmount: parseFloat(data.goalAmount),
      currentAmount: parseFloat(data.currentAmount),
    };
    setSavingsGoal(newSavingsGoal);
    form.reset();
  };

  const calculateProgress = () => {
    if (!savingsGoal) return 0;
    return Math.min((savingsGoal.currentAmount / savingsGoal.goalAmount) * 100, 100);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Savings Goals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Set Savings Goal</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="goalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Amount</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Amount Saved</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Set Goal</Button>
            </form>
          </Form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Current Savings Goal</h2>
          {savingsGoal ? (
            <div>
              <p className="mb-2">Goal: ${savingsGoal.goalAmount.toFixed(2)}</p>
              <p className="mb-2">Current: ${savingsGoal.currentAmount.toFixed(2)}</p>
              <Progress value={calculateProgress()} className="w-full" />
              <p className="mt-2">{calculateProgress().toFixed(2)}% of goal reached</p>
            </div>
          ) : (
            <p>No savings goal set yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Savings;