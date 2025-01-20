import React, { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";

function MyShoppingList() {

    const { shoppingList } = useContext(RecipeContext);
    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">My Shopping List</h1>
            {shoppingList.length > 0 ? (
                <ul className="list-disc pl-6">
                    {shoppingList.map((item, index) => (
                        <li key={index} className="mb-2">
                            {item}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">Your shopping list is empty.</p>
            )}
        </div>
    );
}

export default MyShoppingList;