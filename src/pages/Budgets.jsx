import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

const budgetSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Amount must be a positive number",
  }),
});

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);

  const form = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category: '',
      amount: '',
    },
  });

  const onSubmit = (data) => {
    const newBudget = {
      ...data,
      amount: parseFloat(data.amount),
      spent: 0, // Initialize spent amount to 0
    };
    setBudgets([...budgets, newBudget]);
    form.reset();
  };

  // Simulated function to update spent amount (in a real app, this would be based on actual expenses)
  const updateSpentAmount = (index) => {
    const updatedBudgets = [...budgets];
    const budget = updatedBudgets[index];
    const randomSpent = Math.random() * budget.amount;
    budget.spent = parseFloat(randomSpent.toFixed(2));
    setBudgets(updatedBudgets);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Budgets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Set Budget</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="groceries">Groceries</SelectItem>
                        <SelectItem value="bills">Bills</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="transportation">Transportation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Set Budget</Button>
            </form>
          </Form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Budget Usage</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgets.map((budget, index) => (
                <TableRow key={index}>
                  <TableCell>{budget.category}</TableCell>
                  <TableCell>${budget.amount.toFixed(2)}</TableCell>
                  <TableCell>${budget.spent.toFixed(2)}</TableCell>
                  <TableCell>
                    <Progress value={(budget.spent / budget.amount) * 100} className="w-full" />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => updateSpentAmount(index)}>Update Spent</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Budgets;