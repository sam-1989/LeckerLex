import React, { useEffect, useState } from "react";
import IngredientsGallery from "./IngredientsGallery";

// Images
import Chilli from "../assets/Ingredients/Herbs_Spices/chilli.png";
import Cumin from "../assets/Ingredients/Herbs_Spices/cumin.png";
import Dill from "../assets/Ingredients/Herbs_Spices/dill.png";
import Dry_Bay from "../assets/Ingredients/Herbs_Spices/dry_bay_leaf.png";
import Ginger from "../assets/Ingredients/Herbs_Spices/ginger.png";
import Paprika from "../assets/Ingredients/Herbs_Spices/paprika.png";
import Parsley from "../assets/Ingredients/Herbs_Spices/parsley.png";
import Rosemary from "../assets/Ingredients/Herbs_Spices/rosemary.png";
import Spinach from "../assets/Ingredients/Herbs_Spices/spinach.png";
import Thyme from "../assets/Ingredients/Herbs_Spices/thyme.png";
import Turmeric from "../assets/Ingredients/Herbs_Spices/turmeric.png";
import Cinnamon from "../assets/Ingredients/Herbs_Spices/cinnamon.png";
import Nutmeg from "../assets/Ingredients/Herbs_Spices/nutmeg.png";

export default function Ingredients({
  selectedCategory,
  // selectedIngredients,
  // setSelectedIngredients,
  searchText,
  setSearchText,
}) {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Herbs and Spices
  const herbsAndSpices = [
    { src: Chilli, alt: "Chilli" },
    { src: Cinnamon, alt: "Cinnamon" },
    { src: Cumin, alt: "Cumin" },
    { src: Dill, alt: "Dill" },
    { src: Dry_Bay, alt: "Dried Bay leaf" },
    { src: Paprika, alt: "Paprika" },
    { src: Parsley, alt: "Parsley" },
    { src: Spinach, alt: "Spinach" },
    { src: Rosemary, alt: "Rosemary" },
    { src: Thyme, alt: "Thyme" },
    { src: Ginger, alt: "Ginger" },
    { src: Turmeric, alt: "Turmeric" },
    { src: Nutmeg, alt: "Nutmeg" },
  ];

  // category 2

  // category 3

  // category 4

  // category 5

  // category 6

  // category 7

  // category 8

  // category 9

  // category 10

  // category 11

  // category 12

  // category 13

  // Toggle the clicked ingredient and set the searchText accordingly
  const handleImageClick = (ingredientName) => {
    const updated = selectedIngredients.includes(ingredientName)
      ? selectedIngredients.filter((item) => item !== ingredientName)
      : [...selectedIngredients, ingredientName];
    setSelectedIngredients(updated);
    setSearchText(updated.join(", "));
  };

  // Convert the typed text into a list of ingredients (case-insensitive)
  useEffect(() => {
    // Split by comma, lowercase & trim
    const typed = searchText
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);

    // Filter array to matches
    const matched = herbsAndSpices
      .filter((h) => typed.includes(h.alt.toLowerCase()))
      .map((h) => h.alt);

    // Update selectedIngredients if changed
    if (JSON.stringify(matched) !== JSON.stringify(selectedIngredients)) {
      setSelectedIngredients(matched);
    }
  }, [searchText, herbsAndSpices, selectedIngredients, setSelectedIngredients]);

  // show only if herbs and spices are chosen
  //    if (selectedCategory !== "Herbs and Spices") return null;

  return (
    <IngredientsGallery
      herbsAndSpices={herbsAndSpices}
      selectedIngredients={selectedIngredients}
      handleImageClick={handleImageClick}
    />
  );
}
