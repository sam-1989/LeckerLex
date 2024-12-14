import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                  LeckerLex
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link to="/about" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                  About
                </Link>
                <Link to="/recipes" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                  Recipes
                </Link>
                <Link to="/contact" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h1 className="text-3xl font-bold text-gray-900">Welcome to LeckerLex</h1>
              <p className="mt-1 text-sm text-gray-600">
                Find delicious recipes with the ingredients you already have at home – clever and uncomplicated!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}