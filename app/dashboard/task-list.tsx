// app/components/TaskList.tsx
'use client';

import React from 'react';
import { Task } from '@/app/lib/definitions/Task';
import { TaskStatus } from '../lib/definitions/TaskEnum';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  const getStatusColor = (status: TaskStatus) => {
    switch(status) {
      case TaskStatus.TODO: return 'bg-yellow-100 text-yellow-800';
      case TaskStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-800';
      case TaskStatus.DONE: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-md overflow-hidden sm:rounded-lg">
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li key={task.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-800 truncate">{task.title}</p>
              <div className="ml-2 flex-shrink-0 flex">
                <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                  {task.status}
                </p>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  Priority: {task.priority}
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  Category: {task.category.getName()}
                </p>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              {task.status !== TaskStatus.DONE && (
                <button 
                  onClick={() => onUpdateTask(task.id, { status: TaskStatus.DONE })}
                  className="px-3 py-1 text-sm text-white bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                >
                  Mark as Done
                </button>
              )}
              <button 
                onClick={() => onDeleteTask(task.id)}
                className="px-3 py-1 text-sm text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}