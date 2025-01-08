import React from 'react';
import { Link } from "react-router-dom";

export default function LoginComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <button className="text-gray-700 text-lg">
          <i className="fas fa-bars"></i> {/* Menu Icon */}
        </button>
        <img
          src="/logo.png" // Hier dein Logo-Pfad
          alt="Logo"
          className="h-10"
        />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        {/* Registration Form */}
        <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
          {/* <h1 className="text-2xl font-heading text-gray-900 mb-6 text-center">
            Sign Up
          </h1> */}
          <form>
            <div className="mb-4">
              <label className="text-2xl font-heading text-gray-900 mb-6 text-center">
                Email:
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-heading">
                Password:
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-lg bg-green-600 text-white rounded-full shadow-lg hover:bg-green-500 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center mt-4 text-sm text-gray-600">
            <p>
              No profile?{' '}
              <a href="/register" className="text-indigo-600 hover:underline">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
