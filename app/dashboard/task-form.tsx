// app/components/TaskForm.tsx
'use client';

import React, { useState } from 'react';
import { TaskPriority } from '@/app/lib/definitions/TaskEnum';
import { Category } from '@/app/lib/definitions/Task';

interface TaskFormProps {
  onCreateTask: (task: {
    title: string;
    description: string;
    priority: TaskPriority;
    dueDate: string;
    category: Category;
  }) => void;
}

export default function TaskForm({ onCreateTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateTask({
      title,
      description,
      priority,
      dueDate,
      category: new Category(category),
    });
    // Reset form
    setTitle('');
    setDescription('');
    setPriority(TaskPriority.MEDIUM);
    setDueDate('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create New Task</h2>
      {['title', 'description', 'priority', 'dueDate', 'category'].map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          {field === 'description' ? (
            <textarea
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
              id={field}
              value={eval(field)}
              onChange={(e) => eval(`set${field.charAt(0).toUpperCase() + field.slice(1)}`)(e.target.value)}
              required
            />
          ) : field === 'priority' ? (
            <select
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
              id={field}
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              {Object.values(TaskPriority).map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          ) : (
            <input
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
              id={field}
              type={field === 'dueDate' ? 'date' : 'text'}
              value={eval(field)}
              onChange={(e) => eval(`set${field.charAt(0).toUpperCase() + field.slice(1)}`)(e.target.value)}
              required
            />
          )}
        </div>
      ))}
      <div className="flex items-center justify-between">
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
          type="submit"
        >
          Create Task
        </button>
      </div>
    </form>
  );
}