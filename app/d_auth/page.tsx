import React from 'react';
import AuthForm from './auth-form';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to TaskFlow</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to manage your tasks efficiently</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}