import React, { useState, useEffect } from "react";

function ShoppingList({ chosenRecipe }) {
  const [products, setProducts] = useState(["Milk", "Eggs", "Bread"]);
  const [checkedProducts, setCheckedProducts] = useState({});
  const [missingIngredients, setMissingIngredients] = useState([]);

  useEffect(() => {
    // Example: if chosenRecipe is provided, set missing ingredients
    if (chosenRecipe) {
      setMissingIngredients(chosenRecipe.missingIngredients || []);
    }
  }, [chosenRecipe]);

  const handleAddMissingIngredients = () => {
    const updatedProducts = [...products];
    missingIngredients.forEach((ingredient) => {
      if (!updatedProducts.includes(ingredient)) {
        updatedProducts.push(ingredient);
      }
    });
    setProducts(updatedProducts);

  };

  const handleCheckProduct = (product) => {

    setCheckedProducts((prev) => ({
      ...prev,
      [product]: !prev[product],

    }));
  };

  const handleRemoveProduct = (product) => {
    setProducts(products.filter((p) => p !== product));
    setCheckedProducts((prev) => {
      const updated = { ...prev };
      delete updated[product];
      return updated;
    });
  };

  const handleRemoveAll = () => {
    setProducts([]);
    setCheckedProducts({});
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-xl mx-auto rounded-xl bg-white shadow-lg p-6 space-y-6">
        <h2 className="text-3xl text-center font-semibold text-green-800 mb-6">My Shopping List</h2>
        
        {missingIngredients.length > 0 && (
          <button
            onClick={handleAddMissingIngredients}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition w-full"
          >
            Add Missing Ingredients from Chosen Recipe
          </button>
        )}

        {/* If products is empty, show a message */}
        {products.length === 0 && (
          <p className="text-center text-gray-600">No items in your list yet.</p>
        )}

        <ul className="space-y-2">
          {products.map((product) => (
            <li
              key={product}
              className="bg-gray-100 flex justify-between items-center py-2 px-4 rounded-md"
            >
              <div className="flex items-center space-x-3">

                <input
                  type="checkbox"
                  checked={checkedProducts[product] || false}
                  onChange={() => handleCheckProduct(product)}
                  className="h-5 w-5 text-green-600 focus:ring-green-600"
                />
                <span
                  className={`${
                    checkedProducts[product] ? "line-through text-gray-500" : ""
                  }`}
                >
                  {product}
                </span>
              </div>
              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => handleRemoveProduct(product)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {products.length > 0 && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md w-full mt-4 hover:bg-red-600 transition"
            onClick={handleRemoveAll}
          >
            Remove All
          </button>
        )}
      </div>
    </div>
  );
}


export default ShoppingList;