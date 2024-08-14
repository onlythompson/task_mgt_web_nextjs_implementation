import React from 'react';
import { Sun, List, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100 text-gray-800 font-sans">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-orange-600">ErgonFlow</div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#features" className="hover:text-orange-600 transition-colors">Features</a></li>
            <li><a href="#about" className="hover:text-orange-600 transition-colors">About</a></li>
            <li><a href="#contact" className="hover:text-orange-600 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Simplify Your Workflow</h1>
          <p className="text-xl mb-8">Manage task effortlessly with ErgonFlow</p>
          <Link href="/login" className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center">
          Get Stated <ArrowRight className="ml-2" size={20} /> </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Sun className="text-orange-500 mb-4" size={40} />
            <h2 className="text-xl font-semibold mb-2">Intuitive Design</h2>
            <p>Experience a user-friendly interface that makes task management a breeze.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <List className="text-orange-500 mb-4" size={40} />
            <h2 className="text-xl font-semibold mb-2">Smart Organization</h2>
            <p>Categorize and prioritize your task with our intelligent sorting system.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Check className="text-orange-500 mb-4" size={40} />
            <h2 className="text-xl font-semibold mb-2">Progress Tracking</h2>
            <p>Monitor your productivity and celebrate your accomplishments.</p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to boost your productivity?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied users and transform your task management today.</p>
          <Link href="/login" className="bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center">
          Sign up Now<ArrowRight className="ml-2" size={20} /> </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 ErgonFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;