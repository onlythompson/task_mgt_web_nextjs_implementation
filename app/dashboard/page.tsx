import React from 'react';
import DashboardClient from './dashboard-client';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Task Management Dashboard</h1>
      <DashboardClient />
    </div>
  );
}