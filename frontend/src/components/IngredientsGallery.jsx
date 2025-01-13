import React from "react";

function IngredientsGallery({ herbsAndSpices,
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
  selectedCategory, }) {

    let itemsToDisplay = [];

    switch (selectedCategory) {
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
        itemsToDisplay = [];
    }
  return (
    <div className="grid gap-4 p-4 grid-cols-3 lg:grid-cols-6">
      {itemsToDisplay.map((item, idx) => {
        const isSelected = selectedIngredients.includes(item.alt);

        return (
          <div
            key={idx}
            className="relative cursor-pointer group overflow-hidden rounded-3xl shadow-inner bg-gray-200 outline-3"
            onClick={() => handleImageClick(item.alt)}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover mx-auto transition-transform duration-300 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 text-white text-sm sm:text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.alt}
            </div>
            {isSelected && (
              <div className="absolute top-2 right-2 text-green-500 text-xl rounded-full p-1 bg-white">
                ✔
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default IngredientsGallery;