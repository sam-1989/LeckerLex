import React, { useState } from 'react';

const Favorites = () => {
  const [cookTime, setCookTime] = useState('');
  const [calories, setCalories] = useState('');
  const [nutrition, setNutrition] = useState('');

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <main className="p-6 bg-white shadow-lg rounded-lg w-full max-w-2xl">
        <section>
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">My Favorite Recipes</h1>
          <div className="flex flex-wrap gap-4 mb-6">
            <label className="flex flex-col">
              <span className="mb-2 text-gray-700">Cooking time</span>
              <select
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                <option value="0-15">0 - 15 minutes</option>
                <option value="15-30">15 - 30 minutes</option>
                <option value="30-45">30 - 45 minutes</option>
                <option value="45-60">45 - 60 minutes</option>
                <option value="60+">60 or more</option>
              </select>
            </label>
            <label className="flex flex-col">
              <span className="mb-2 text-gray-700">Calories</span>
              <select
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                <option value="0-100">0 - 100 calories</option>
                <option value="100-200">100 - 200 calories</option>
                <option value="200-300">200 - 300 calories</option>
                <option value="300-400">300 - 400 calories</option>
                <option value="400+">400 or more calories</option>
              </select>
            </label>
            <label className="flex flex-col">
              <span className="mb-2 text-gray-700">Nutrition</span>
              <select
                value={nutrition}
                onChange={(e) => setNutrition(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-free</option>
                <option value="dairy-free">Gairy-free</option>
              </select>
            </label>
          </div>
        </section>
        <section className="mt-8">
          <p className="text-gray-600">Here are going to render the favorite recipes...</p>
          <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim placeat dolores obcaecati beatae delectus labore officia ratione ullam, eligendi praesentium! At nostrum, sed sint eaque exercitationem alias optio maiores dolore.</p>
        </section>
      </main>
      <div className="flex justify-center mt-6 w-full">
        <button
          onClick={() => {
            // Logic to navigate back to home
            window.location.href = "/home";
          }}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Favorites;