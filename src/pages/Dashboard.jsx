import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const fetchDashboardData = async () => {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalIncome: 5000,
        totalExpenses: 3500,
        savings: 1500,
        savingsGoal: 2000,
      });
    }, 1000);
  });
};

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const savingsProgress = (data.savings / data.savingsGoal) * 100;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Financial Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">${data.totalIncome.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">${data.totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">${data.savings.toFixed(2)}</p>
            <Progress value={savingsProgress} className="mt-2" />
            <p className="text-sm mt-1">
              {savingsProgress.toFixed(2)}% of ${data.savingsGoal.toFixed(2)} goal
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;