// app/components/TaskFilters.tsx
'use client';

import React from 'react';
import { TaskStatus, TaskPriority } from '@/app/lib/definitions/TaskEnum';

interface TaskFiltersProps {
  onFilterChange: (filters: { status?: TaskStatus; priority?: TaskPriority; category?: string }) => void;
}

export default function TaskFilters({ onFilterChange }: TaskFiltersProps) {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value === 'all' ? undefined : value });
  };

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Filters</h2>
    <div className="flex flex-wrap -mx-2">
      {['status', 'priority', 'category'].map((filterType) => (
        <div key={filterType} className="px-2 w-full sm:w-1/3 mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={filterType}>
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </label>
          {filterType === 'category' ? (
            <input
              id={filterType}
              name={filterType}
              type="text"
              onChange={handleFilterChange}
              placeholder={`Enter ${filterType}`}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ) : (
            <select
              id={filterType}
              name={filterType}
              onChange={handleFilterChange}
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All</option>
              {Object.values(filterType === 'status' ? TaskStatus : TaskPriority).map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  </div>
  );
}