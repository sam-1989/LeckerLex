import { createContext, useState } from "react";

export const RecipeContext = createContext();

export default function RecipeContextProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        shoppingList,
        setShoppingList,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}
