// app/components/TaskManagementDashboard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import TaskFilters from './task-filters';
import TaskList from './task-list';
import TaskForm from './task-form';
import { TaskStatus, TaskPriority } from '@/app/lib/definitions/TaskEnum';
import { Task,  Category } from '@/app/lib/definitions/Task';


// Define the type for filters
interface Filters {
  status?: TaskStatus;
  priority?: TaskPriority;
  category?: string;
}

// Mock function to simulate fetching tasks from an API
const fetchTasks = async (): Promise<Task[]> => {
  // This would be replaced with an actual API call
  return [
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Write and submit the project proposal for the new client',
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      dueDate: '2024-08-20',
      category: new Category('Work'),
      createdByUserId: 'user1',

    },
    {
      id: '2',
      title: 'Buy groceries',
      description: 'Get items for the week',
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      dueDate: '2024-08-15',
      category: new Category('Personal'),
      createdByUserId: 'user1',

    },
    // Add more mock tasks as needed
  ];
};

export default function TaskManagementDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<Filters>({});

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };
    loadTasks();
  }, []);

  const handleCreateTask = (newTask: Partial<Task>) => {
    // This would typically involve an API call
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      status: TaskStatus.TODO,
      createdByUserId: 'user1', // This should come from authentication
    } as Task;
    setTasks([...tasks, task]);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    // This would typically involve an API call
    setTasks(tasks.map(task => task.id === taskId ? { ...task, ...updates, updatedAt: new Date() } : task));
  };

  const handleDeleteTask = (taskId: string) => {
    // This would typically involve an API call
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    return (
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority) &&
      (!filters.category || task.category.getName() === filters.category)
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold mb-8 text-gray-800">Task Management Dashboard</h1>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <TaskFilters onFilterChange={setFilters} />
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
  </div>
  );
}