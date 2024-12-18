import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaUser,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

const categories = [
  "Fruits",
  "Vegetables",
  "Dairy Products",
  "Meat",
  "Fish",
  "Flour and Baking Ingredients",
  "Grains and Legumes",
  "Eggs and Proteins",
  "Canned Goods and Sauces",
  "Herbs and Spices",
  "Oils and Fats",
  "Snacks and Side Dishes",
];

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute -left-7 top-1/2 transform -translate-y-1/2 cursor-pointer"
      onClick={onClick}
    >
      <FaArrowLeft className="text-2xl text-gray-800 hover:text-gray-600" />
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute -right-8 top-1/2 transform -translate-y-1/2 cursor-pointer"
      onClick={onClick}
    >
      <FaArrowRight className="text-2xl text-gray-800 hover:text-gray-600" />
    </div>
  );
};

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [placeholder, setPlaceholder] = useState("Zutaten eingeben...");
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // // The placeholder will show the selected ingredients if any are selected, otherwise the default text
  // const placeholderText =
  //   selectedIngredients.length > 0
  //     ? selectedIngredients.join(" ")
  //     : "Enter ingredients...";

  // category 1
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

  const handleImageClick = (ingredient) => {
    // check if the ingredient has already been chosen
    if (selectedIngredients.includes(ingredient)) {
      // remove
      const updated = selectedIngredients.filter((item) => item !== ingredient);
      setSelectedIngredients(updated);
      setSearchText(updated.join(", "));
    } else {
      // add
      const updated = [...selectedIngredients, ingredient];
      setSelectedIngredients(updated);
      setSearchText(updated.join(", "));
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation bar  */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <NavLink to="/" className="text-2xl font-bold text-gray-800">
                  LeckerLex
                </NavLink>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaSearch className="text-gray-800 hover:text-gray-600 cursor-pointer" />
              <div className="relative">
                {/* Mobiles Menü-Symbol */}
                <div className="md:hidden">
                  {isDropdownOpen ? (
                    <FaTimes
                      onClick={() => setIsDropdownOpen(false)}
                      className="text-gray-800 hover:text-gray-600 cursor-pointer"
                    />
                  ) : (
                    <FaBars
                      onClick={() => setIsDropdownOpen(true)}
                      className="text-gray-800 hover:text-gray-600 cursor-pointer"
                    />
                  )}
                </div>
                {/* Desktop User Icon */}
                <FaUser
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-gray-800 hover:text-gray-600 cursor-pointer hidden md:block"
                />
                {/* Dropdown-Menü */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Profil
                    </NavLink>
                    <NavLink
                      to="/settings"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Einstellungen
                    </NavLink>
                    <NavLink
                      to="/favorites"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Favoriten
                    </NavLink>
                    <NavLink
                      to="/recipes"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Rezepte
                    </NavLink>
                    <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Abmelden
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search bar  */}
      <div className="text-center mt-8 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Tell us what you have – we will find the perfect recipe for you 😃
        </h2>
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            className="w-full sm:w-1/2 p-2 border border-gray-200 rounded-l-full shadow-lg 
        hover:border-gray-500 hover:shadow-xl 
        focus:border-green-600 focus:ring-3 focus:ring-green-400 
        transition duration-300 outline-none"
            placeholder={placeholder}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setPlaceholder("")}
            onBlur={() => setPlaceholder("Enter ingredients...")}
          />
          <button className="p-3 bg-green-500 text-white rounded-r-full">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* category slider */}

      <div className="bg-gray-100 py-4">
        <div className="max-w-screen-lg mx-auto mt-6 px-4 relative ">
          <Slider {...sliderSettings} className="category-slider">
            {categories.map((category, index) => (
              <div key={index} className="flex justify-center px-2 shadow-2xl ">
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full py-2 rounded text-gray-900 text-sm text-center transform hover:scale-105 transition duration-300 ${
                    selectedCategory === category
                      ? "bg-green-600 text-white rounded-full"
                      : "bg-green-400"
                  }`}
                >
                  {category}
                </button>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* images grid */}

      {selectedCategory === "Herbs and Spices" && (
        <div className="grid gap-4 p-4 grid-rows-2 grid-flow-col ">
          {herbsAndSpices.map((item, idx) => {
            const isSelected = selectedIngredients.includes(item.alt);
            return (
              <div
                key={idx}
                className="relative cursor-pointer group"
                onClick={() => handleImageClick(item.alt)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className={`hover:scale-105 hover:rounded-lg transition-transform duration-200 max-w-full h-auto`}
                />
                {/* text overlay when hovering */}
                <div
                  className="absolute inset-0 flex items-center justify-center
                      bg-gray-50/50 backdrop-blur-sm text-gray-900 
                      text-sm sm:text-lg py-2
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  {item.alt}
                </div>
                {/* green V when ingredient is chosen */}
                {isSelected && (
                  <div
                    className="absolute top-2 right-2 text-white text-xl rounded-full p-1"
                    style={{ backgroundColor: "#fff" }}
                  >
                    ✔
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
