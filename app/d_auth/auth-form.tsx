// app/auth/AuthForm.tsx
'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { authenticate, register } from '../lib/actions/authenticate';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [authState, authAction] = useFormState(authenticate, undefined);
  const [registerState, registerAction] = useFormState(register, undefined);

  return (
    <form action={isLogin ? authAction : registerAction} className="mt-8 space-y-6">
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      {isLogin && (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
              Forgot your password?
            </a>
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          {isLogin ? 'Sign in' : 'Sign up'}
        </button>
      </div>
      
      {authState && <p className="text-red-500 text-center">{authState}</p>}
      {registerState && <p className="text-red-500 text-center">{registerState}</p>}

      <div className="text-center">
        <p className="mt-2 text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <a 
            href="#" 
            className="font-medium text-orange-600 hover:text-orange-500"
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </a>
        </p>
      </div>
    </form>
  );
}