# Task Management Application - Frontend Documentation

## Table of Contents
1. [Introduction](#1-introduction)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Screen Implementations](#4-screen-implementations)
5. [Next.js App Router and Server Components](#5-nextjs-app-router-and-server-components)
6. [Client Components](#6-client-components)
7. [Authentication](#7-authentication)
8. [State Management](#8-state-management)
9. [API Integration](#9-api-integration)
10. [Styling](#10-styling)
11. [Performance Optimization](#11-performance-optimization)
12. [Testing](#12-testing)
13. [Deployment](#13-deployment)
14. [Setup and Installation](#14-setup-and-installation)
15. [Conclusion](#15-conclusion)

## 1. Introduction

This documentation outlines the frontend implementation of the Task Management Web Application. Built with Next.js 13+ and integrated with Auth.js for authentication, this frontend provides a responsive, efficient, and user-friendly interface for managing tasks. It leverages the new App Router and Server Components for improved performance and developer experience.

## 2. Technology Stack

- **Framework**: Next.js 13+ (React)
- **Authentication**: Auth.js (formerly NextAuth.js)
- **State Management**: React Context API and Hooks
- **Styling**: Tailwind CSS
- **HTTP Client**: Native fetch API
- **Form Handling**: React Hook Form
- **Testing**: Jest and React Testing Library

## 3. Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── tasks/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   └── api/
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── tasks/
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   └── TaskForm.tsx
│   └── common/
│       ├── Button.tsx
│       └── Input.tsx
├── lib/
│   ├── api.ts
│   └── auth.ts
├── types/
│   └── task.ts
├── utils/
│   └── dateFormatter.ts
├── public/
│   └── mocks/
│       ├── home.png
│       ├── task-list.png
│       └── task-detail.png
└── tests/
    ├── components/
    └── app/
```

## 4. Screen Implemenations

### Home page  

![Home Page](/app_landing_page.PNG)

### Authentication page

![Authentication Page](/sign_up_sign_page.PNG)

### Task Management Page

![Task Dashboard](/task_mgt_dashboard.PNG)


## 5. Next.js App Router and Server Components

We leverage Next.js 13+'s new App Router and Server Components for improved performance and developer experience. Here's an example of a Server Component:

```typescript
import React from 'react';
import AuthForm from './auth-form';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to ErgonFlow</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to manage your tasks efficiently</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
```

This Server Component fetches tasks on the server, reducing the amount of JavaScript sent to the client and improving initial page load times.

## 6. Client Components

For interactive elements, we use Client Components. Here's an example:

```typescript
// components/tasks/TaskForm.tsx
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
```

This Client Component handles user input and updates the UI accordingly.

## 7. Authentication

We use Auth.js for handling authentication. Here's a basic setup:

```typescript
```

## 8. State Management

We use React Context API for global state management. Here's an example of a TaskContext:

```typescript
/
```

## 9. API Integration

We use the native fetch API for data fetching. Here's an example:

```typescript
// lib/api.ts

```

## 10. Styling

We use Tailwind CSS for styling. Here's an example of how we apply styles:

```typescript
// components/common/Button.tsx

```

## 11. Performance Optimization

1. We use Next.js Server Components for improved initial page load times
2. Implement code splitting using dynamic imports for Client Components
3. Use React.memo for preventing unnecessary re-renders of components
4. Implement image optimization using Next.js Image component

## 12. Testing

We use Jest and React Testing Library for unit and integration tests. Here's an example test:

```typescript

```

## 13. Deployment

We use Vercel for deploying our Next.js application. The deployment process is as follows:

1. Push your code to a GitHub repository
2. Connect your Vercel account to your GitHub account
3. Import the project into Vercel
4. Configure your environment variables
5. Deploy

Vercel will automatically deploy your application on every push to the main branch.

## 14. Setup and Installation

[This section remains unchanged from the previous version]

## 15. Conclusion

This frontend implementation for the Task Management Application leverages the latest features of Next.js 13+ to create a responsive, efficient, and user-friendly interface. Key highlights include:

1. **Next.js App Router**: Utilizing the new file-based routing system for improved performance and developer experience.
2. **Server Components**: Leveraging server-side rendering for faster initial page loads and improved SEO.
3. **Client Components**: Using client-side interactivity where needed for a dynamic user experience.
4. **Authentication**: Implementing secure user authentication with Auth.js.
5. **Responsive Design**: Ensuring a great user experience across devices with Tailwind CSS.
6. **State Management**: Using React Context for efficient state management without the complexity of additional libraries.
7. **API Integration**: Implementing efficient data fetching with the native fetch API.
8. **Performance Optimization**: Applying various techniques to ensure the application runs smoothly.
9. **Testing**: Ensuring reliability with comprehensive unit and integration tests.
10. **Screen Mocks**: Guiding development with clear visual references.

This implementation provides a solid foundation for the Task Management Application, taking full advantage of modern Next.js features while maintaining flexibility for future enhancements.