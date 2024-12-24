import React, { useState } from "react";
import Footer from "../components/Footer";
import {
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
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
      className="absolute -left-6 top-1/3 transform -translate-y-1/2 cursor-pointer"
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
      className="absolute -right-6 top-1/3 transform -translate-y-1/2 cursor-pointer"
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
  slidesToScroll: 3,
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
  const [searchText, setSearchText] = useState("");
  const [placeholder, setPlaceholder] = useState("Enter your ingredients...");
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

      {/* Search bar  */}
      <div className="text-center mt-8 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Got ingredients? Weve got the recipe! 🥘✨
        </h2>
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            className="w-full sm:w-1/2 p-2 border border-gray-200 rounded-l-full shadow-lg 
        hover:border-gray-500 hover:shadow-2xl 
        focus:border-green-600 focus:ring-3 focus:ring-green-400 
        transition duration-300 outline-none"
            placeholder={placeholder}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setPlaceholder("")}
            onBlur={() => setPlaceholder("Enter ngredients...")}
          />
          <button className="p-3 bg-green-500 text-white rounded-r-full">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* category slider */}

      <div className="bg-gray-100 py-4">
        <div className="max-w-screen-lg mx-auto mt-6 px-4 relative">
          <Slider {...sliderSettings} className="category-slider">
            {categories.map((category, index) => (
              <div key={index} className="flex justify-center px-2 shadow-sm ">
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full py-2 rounded-xl text-gray-900 text-sm text-center transform hover:scale-105 transition duration-300 ${
                    selectedCategory === category
                      ? "bg-green-600 text-white rounded-xl"
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
  <div className="grid gap-4 p-4 grid-cols-3  lg:grid-cols-6 lg:grid-rows-2">
    {herbsAndSpices.map((item, idx) => {
      const isSelected = selectedIngredients.includes(item.alt);
      return (
        <div
          key={idx}
          className="relative cursor-pointer group overflow-hidden rounded-lg shadow-inner bg-gray-200 outline-3"
          onClick={() => handleImageClick(item.alt)}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
          />
          {/* text overlay when hovering */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white text-sm sm:text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {item.alt}
          </div>
          {/* green V when ingredient is chosen */}
          {isSelected && (
            <div
              className="absolute top-2 right-2 text-green-500 text-xl rounded-full p-1 bg-white"
            >
              ✔
            </div>
          )}
        </div>
      );
    })}
  </div>
)}
      <Footer />
    </div>
  );
}
