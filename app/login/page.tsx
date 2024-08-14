import React from 'react';
// import LoginForm from '../components/login-form';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('../components/login-form'), { ssr: false });

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome back to TaskFlow</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to manage your tasks efficiently</p>
        </div>
        <LoginForm />
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;