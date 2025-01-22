import React, { useState, useEffect } from "react";

function IngredientsGallery({
  herbsAndSpices,
  vegetables,
  fruits,
  meat,
  seafood,
  grainsAndLegumes,
  snacksAndSideDishes,
  dairyProducts,
  oilsAndFats,
  flourAndBakingIngredients,
  eggsAndProteins,
  cannedGoodsAndSauces,
  selectedIngredients,
  handleImageClick,
  selectedCategory,
  setSelectedCategory,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false); // Reset isLoaded to trigger animation
    const timer = setTimeout(() => setIsLoaded(true), 100); // Delay to allow re-render
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [selectedCategory]);

  let itemsToDisplay = [];
  const category = selectedCategory || "Fruits";
  switch (category) {
    case "Herbs and Spices":
      itemsToDisplay = herbsAndSpices;
      break;
    case "Vegetables":
      itemsToDisplay = vegetables;
      break;
    case "Fruits":
      itemsToDisplay = fruits;
      break;
    case "Meat":
      itemsToDisplay = meat;
      break;
    case "Seafood":
      itemsToDisplay = seafood;
      break;
    case "Grains and Legumes":
      itemsToDisplay = grainsAndLegumes;
      break;
    case "Snacks and Side Dishes":
      itemsToDisplay = snacksAndSideDishes;
      break;
    case "Dairy Products":
      itemsToDisplay = dairyProducts;
      break;
    case "Oils and Fats":
      itemsToDisplay = oilsAndFats;
      break;
    case "Flour and Baking Ingredients":
      itemsToDisplay = flourAndBakingIngredients;
      break;
    case "Eggs and Proteins":
      itemsToDisplay = eggsAndProteins;
      break;
    case "Canned Goods and Sauces":
      itemsToDisplay = cannedGoodsAndSauces;
      break;
    default:
      itemsToDisplay = fruits;
      break;
  }

  return (
    <div className="max-w-screen-lg mx-auto border border-gray-200 px-2 md:px-4 lg:px-24 py-4 p-4 my-6 rounded-3xl lg:rounded-full bg-green-50 shadow-inner">
      <div className="grid gap-4 p-4 grid-cols-5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {itemsToDisplay.map((item, idx) => {
          const isSelected = selectedIngredients.includes(item.alt);
          const delay = idx * 50;
          return (
            <div
              key={idx}
              className={`relative cursor-pointer aspect-w-1 aspect-h-1 group overflow-hidden
                 rounded-xl hover:outline hover:outline-1 hover:outline-gray-300 shadow-md bg-gray-50 outline-3
                  transition-opacity duration-200 ease-in-out ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => handleImageClick(item.alt)}
              style={{ transitionDelay: `${delay}ms` }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-contain mx-auto border border-gray-200 shadow-md transition-transform
                 duration-100 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20
               text-white text-md font-medium opacity-0 group-hover:opacity-100 duration-200">
                {item.alt}
              </div>
              {isSelected && (
                <div className="absolute top-0 right-0 text-sm px-3 bg-transparent">
                  ✔
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IngredientsGallery;
