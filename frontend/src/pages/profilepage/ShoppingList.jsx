import React, { useState } from "react";

const ShoppingList = () => {
  // Zustände für Kategorien und ihre Produkte
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState({
    Meats: [],
    Fishs: [],
    Fruits: [],
    Vegetables: [],
    Snacks: [],
    Others: []
  });
  const [newProduct, setNewProduct] = useState("");

  // Zustand für das Durchstreichen der Produkte
  const [checkedProducts, setCheckedProducts] = useState({});

  // Funktion zum Hinzufügen eines Produkts
  const handleAddProduct = () => {
    if (newProduct && selectedCategory) {
      setCategories((prevCategories) => {
        const updatedCategory = [...prevCategories[selectedCategory], newProduct];
        return {
          ...prevCategories,
          [selectedCategory]: updatedCategory
        };
      });
      setNewProduct(""); // Eingabefeld zurücksetzen
    }
  };

  // Funktion zum Löschen eines Produkts
  const handleDeleteProduct = (product) => {
    setCategories((prevCategories) => {
      const updatedCategory = prevCategories[selectedCategory].filter(
        (item) => item !== product
      );
      return {
        ...prevCategories,
        [selectedCategory]: updatedCategory
      };
    });
  };

  // Funktion zum Setzen des Häkchens und Durchstreichen des Produkts
  const handleCheckProduct = (product) => {
    setCheckedProducts((prevCheckedProducts) => ({
      ...prevCheckedProducts,
      [product]: !prevCheckedProducts[product]
    }));
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-3xl text-center font-semibold text-gray-800 mt-5 mb-6">My Shopping List</h2>
      
      {/* Kategorien auswählen */}
      <div className="flex space-x-4 mb-6">
        {["Meats", "Fishs", "Fruits", "Vegetables", "Snacks", "Others"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400 transition`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Anzeige der Produkte für die ausgewählte Kategorie */}
      {selectedCategory && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {selectedCategory} Products
          </h3>

          <ul className="space-y-2">
            {categories[selectedCategory].length === 0 ? (
              <li className="text-gray-500">No products added yet.</li>
            ) : (
              categories[selectedCategory].map((product, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center"
                >
                  <span
                    className={checkedProducts[product] ? "line-through text-gray-500" : ""}
                  >
                    {product}
                  </span>
                  <div className="flex items-center space-x-2">
                    {/* Häkchen zum Durchstreichen */}
                    <input
                      type="checkbox"
                      checked={checkedProducts[product] || false}
                      onChange={() => handleCheckProduct(product)}
                      className="text-blue-500"
                    />
                    <button
                      onClick={() => handleDeleteProduct(product)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>

          {/* Eingabefeld zum Hinzufügen eines Produkts */}
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="text"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter product name"
            />
            <button
              onClick={handleAddProduct}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Add +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
// import React, { useState } from "react";

// const ShoppingList = () => {
//   // Zustände für Kategorien und ihre Produkte
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [categories, setCategories] = useState({
//     Meats: [],
//     Fishs: [],
//     Fruits: [],
//     Vegetables: [],
//     Snacks: [],
//     Others: []
//   });
//   const [newProduct, setNewProduct] = useState("");

//   // Funktion zum Hinzufügen eines Produkts
//   const handleAddProduct = () => {
//     if (newProduct && selectedCategory) {
//       setCategories((prevCategories) => {
//         const updatedCategory = [...prevCategories[selectedCategory], newProduct];
//         return {
//           ...prevCategories,
//           [selectedCategory]: updatedCategory
//         };
//       });
//       setNewProduct(""); // Eingabefeld zurücksetzen
//     }
//   };

//   // Funktion zum Löschen eines Produkts
//   const handleDeleteProduct = (product) => {
//     setCategories((prevCategories) => {
//       const updatedCategory = prevCategories[selectedCategory].filter(
//         (item) => item !== product
//       );
//       return {
//         ...prevCategories,
//         [selectedCategory]: updatedCategory
//       };
//     });
//   };

//   return (
//     <div className="p-4 space-y-6">
//       <h2 className="text-3xl text-center font-semibold text-gray-800 mt-5 mb-6">My Shopping List</h2>
      
//       {/* Kategorien auswählen */}
//       <div className="flex space-x-4 mb-6">
//         {["Meats", "Fishs", "Fruits", "Vegetables", "Snacks", "Others"].map((category) => (
//           <button
//             key={category}
//             onClick={() => setSelectedCategory(category)}
//             className={`px-4 py-2 rounded-md ${
//               selectedCategory === category
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 text-gray-700"
//             } hover:bg-blue-400 transition`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Anzeige der Produkte für die ausgewählte Kategorie */}
//       {selectedCategory && (
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             {selectedCategory} Products
//           </h3>

//           <ul className="space-y-2">
//             {categories[selectedCategory].length === 0 ? (
//               <li className="text-gray-500">No products added yet.</li>
//             ) : (
//               categories[selectedCategory].map((product, index) => (
//                 <li key={index} className="flex justify-between items-center">
//                   <span>{product}</span>
//                   <button
//                     onClick={() => handleDeleteProduct(product)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Delete
//                   </button>
//                 </li>
//               ))
//             )}
//           </ul>

//           {/* Eingabefeld zum Hinzufügen eines Produkts */}
//           <div className="flex items-center space-x-2 mt-4">
//             <input
//               type="text"
//               value={newProduct}
//               onChange={(e) => setNewProduct(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-md"
//               placeholder="Enter product name"
//             />
//             <button
//               onClick={handleAddProduct}
//               className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//             >
//               Add +
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShoppingList;