// app/dashboard/DashboardClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import TaskList from './task-list';
import TaskForm from './task-form';
import TaskFilters from './task-filters';
import { TaskStatus, TaskPriority } from '../lib/definitions/TaskEnum';

// Mock function to simulate fetching tasks from an API
const fetchTasks = async () => {
  // This would be replaced with an actual API call
  return [
    {
      id: '1',
      title: 'Complete project proposal',
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      dueDate: '2024-08-20T00:00:00.000Z',
      categoryName: 'Work'
    },
    {
      id: '2',
      title: 'Buy groceries',
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      dueDate: '2024-08-15T00:00:00.000Z',
      categoryName: 'Personal'
    },
    // Add more mock tasks as needed
  ];
};

export default function DashboardClient() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: null,
    priority: null,
    category: null
  });

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };
    loadTasks();
  }, []);

  const handleCreateTask = (newTask) => {
    // This would typically involve an API call
    setTasks([...tasks, { ...newTask, id: Date.now().toString() }]);
  };

  const handleUpdateTask = (updatedTask) => {
    // This would typically involve an API call
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleDeleteTask = (taskId) => {
    // This would typically involve an API call
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    return (
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority) &&
      (!filters.category || task.categoryName === filters.category)
    );
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <TaskFilters filters={filters} setFilters={setFilters} />
        <TaskList 
          tasks={filteredTasks} 
          onUpdateTask={handleUpdateTask} 
          onDeleteTask={handleDeleteTask} 
        />
      </div>
      <div>
        <TaskForm onCreateTask={handleCreateTask} />
      </div>
    </div>
  );
}