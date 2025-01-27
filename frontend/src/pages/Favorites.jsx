import React, { useContext, useState } from 'react';
import { RecipeContext } from '../context/RecipeContext';


function Favorites() {
  const { favorites } = useContext(RecipeContext);
  console.log("Favorites:", favorites);

  const [cookTime, setCookTime] = useState('');
  const [calories, setCalories] = useState('');
  const [nutrition, setNutrition] = useState('');



  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [servings, setServings] = useState(1);
  
  const toggleDetails = (id) => {
    setSelectedRecipeId((prevId) => (prevId === id ? null : id));  // Zustand toggeln
   }

  const handleIncreaseServings = () => {
    setServings((prev) => Math.round((prev + 0.5) * 10) / 10);
  };
  const handleDecreaseServings = () => {
    setServings((prev) => Math.max(0.5, Math.round((prev - 0.5) * 10) / 10));
  };
  const servingsText = `for ${servings} ${servings === 1 || servings === 0.5 ? 'serving' : 'servings'}`;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10">
      <main className="p-6 bg-white shadow-lg rounded-lg w-full max-w-2xl">
        <section>
          <h1 className="text-3xl font-semibold mb-10 text-center text-gray-800">
            My Recipe Highlights
          </h1>
          <div className="flex flex-wrap justify-around gap-4 mb-6">
            <label className="flex flex-col">
              <span className="mb-2 text-gray-700">Cooking time</span>
              <select
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                className="p-2 border border-gray-300 rounded-3xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="p-2 border border-gray-300 rounded-3xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="p-2 border border-gray-300 rounded-3xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select...</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-free</option>
                <option value="dairy-free">Dairy-free</option>
              </select>
            </label>
          </div>
        </section>

        <section className="mt-8">
          <p className="text-gray-600">
            Here are going to render the favorite recipes...
          </p>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            placeat dolores obcaecati beatae delectus labore officia ratione
            ullam, eligendi praesentium! At nostrum, sed sint eaque
            exercitationem alias optio maiores dolore.
          </p>
        </section>

      </main>

      {/* Übertragung von RecipeDetails */}
      <div className='p-4 max-w-6xl mx-auto'>
        {/* Bedingte Darstellung */}
        {selectedRecipeId ? (
          <div className='transition-all duration-500 ease-in-out border rounded-lg shadow-md bg-gray-100'>
            {/* Details des ausgewählten Rezepts */}
            {favorites
            .filter((recipe) => recipe.id === selectedRecipeId)
            .map((recipe) => (
              <div key={recipe.id} className='p-4'>
                {/* Zurück-Button */}
                <button
                onClick={() => setSelectedRecipeId(null)}
                className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none'
                >
                  Back to Favorites
                </button>
                {/* Bild */}
                <div className='w-full h-48 object-contain rounded-md mt-4'>
                  <img
                  src={recipe.image}
                  alt={recipe.title}
                  className='w-full h-full object-contain rounded-md'
                  />
                </div>

                {/* Titel */}
                
                <h2 className='text-2xl font-semibold  mt-4 text-center'>{recipe.title}</h2>

                {/* Ingredients */}
                <h3 className='text-md font-semibold mt-6 mb-4'>Ingredients</h3>
                
                <ul className="list-disc pl-6">
                  <div className="flex items-center mb-4">
                    <button
                    className=" w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full  bg-green-500 text-white text-lg sm:text-xl   hover:bg-green-600 focus:outline-none"
                    onClick={handleDecreaseServings}
                    >
                      {"\u2212"} {/* Unicode Minus-zeichen */}
                    </button>
                      <p className="mx-2 sm:mx-4 text-sm sm:text-base lg:text-lg xl:text-base text-gray-600">
                        Ingredients {servingsText}
                      </p>
                        <button
                          className="w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full  bg-green-500 text-white text-lg sm:text-xl   hover:bg-green-600 focus:outline-none"
                          onClick={handleIncreaseServings}
                          >
                            {"\uFF0B"}  {/* Unicode Plus-Zeichen */}
                          </button>
                    </div>
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>
                        {(ingredient.amount * servings).toFixed(1)} {ingredient.unit} {ingredient.name}
                        
                        
                        </li>
                      ))}
                    </ul>

                {/* Missing Ingredients */}
                <h3 className='text-md font-semibold mt-6'>Missing Ingredients</h3>
                

                {/* Preparation */}
                <h3 className='text-md font-semibold mt-6'>Preparation</h3>
                <ol className='list-decimal pl-6'>
                  {recipe.preparation.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>

                {/* Nutrition */}
                <h3 className='text-md font-semibold mt-6'>Nutrition</h3>
                <ul className='list-disc pl-6'>
                  {Object.entries(recipe.nutrition).map(([key, value]) => (
                    <li key={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} : {value}
                      {key === "calories"
                      ? " kcal"
                      : key === "sodium"
                      ? " mg"
                      : " g"}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          /* Favoriten-Übersicht */
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {favorites.map((recipe) => (
              <div
              key={recipe.id}
              className='transition-all duration-500 ease-in-out border rounded-lg shadow-md'
              >
                {/* Bild */}
                <div className='p-4 flex flex-col items-center'>
                  <div className='w-full h-48 object-contain rounded-md'>
                    <img 
                    src={recipe.image}
                    alt={recipe.title}
                    className='w-full h-48 object-contain rounded-md mb-4'
                    />
                  </div>
                {/* Titel */}
                <div className='mt-4  flex  items-center justify-center  h-16'>
                <h2 className='text-lg font-semibold '>{recipe.title}</h2>
                </div>
                </div>

                {/* View-Details-Button */}
                <div className='flex items-center justify-center mt-4 mb-4'>
                  <button
                  onClick={() => toggleDetails(recipe.id)}
                  className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none'
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6 w-full">
        <button
          onClick={() => {
            // Logic to navigate back to home
            window.location.href = "/home";
          }}
          className="px-6 py-3 bg-blue-500 text-white rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Favorites;
