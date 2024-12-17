import React, {useRef} from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const categories = [
  'Obst', 'Gemüse', 'Milchprodukte', 'Fleisch', 'Fisch',
  'Mehl und Backzutaten', 'Getreide und Hülsenfrüchte', 'Eier und Proteine',
  'Konserven und Soßen', 'Kräuter und Gewürze', 'Öle und Fette', 'Snacks und Beilagen'
];

// Benutzerdefinierte Pfeilkomponenten
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-0 top-1/2 transform -translate-y-1/2
      p-2 bg-green-600 text-white rounded-full cursor-pointer z-10"
      onClick={onClick}
    >
      <FaArrowRight />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-0 top-1/2 transform -translate-y-1/2
      p-2 bg-green-600 text-white rounded-full cursor-pointer z-10"
      onClick={onClick}
    >
      <FaArrowLeft />
    </div>
  );
};

// Slider Einstellungen
const sliderSettings = {
  infinite: true,
  speed: 600,
  slidesToShow: 4,
  slidesToScroll: 1,
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
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                  LeckerLex
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaSearch className="text-gray-800 hover:text-gray-600 cursor-pointer" />
              <FaUser className="text-gray-800 hover:text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hauptinhalt */}
      <div className="text-center mt-8 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Gib ein, was du hast - wir finden das perfekte Rezept 😃
        </h2>
        <div className="mt-4 flex justify-center">
          <input
            type="text"
            className="w-full sm:w-1/2 p-2 border border-gray-100 rounded-l-full shadow-lg"
            placeholder="Zutaten eingeben..."
          />
          <button className="p-3 bg-green-500 text-white rounded-r-full">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Kategorie-Slider */}
      <div className="max-w-screen-lg mx-auto relative mt-6 px-4">
        <Slider {...sliderSettings}>
          {categories.map((category, index) => (
            <div key={index} className="px-2">
              <button
                className=" px-2 py-1 sm:px-4 sm:py-2 bg-green-500
                text-white rounded-full hover:bg-green-700 transition
                duration-300 text-xs sm:text-base whitespace-nowrap shadow-md"
              >
                {category}
              </button>
            </div>
          ))}
        </Slider>
      </div>

      {/* Zutaten-Grid */}
      <div className="flex justify-center mt-8 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          <div className="w-24 h-24 sm:w-36 sm:h-36 bg-gray-300 rounded-lg hover:shadow-lg 
          transform hover:scale-105 transition duration-300"></div>
          <div className="w-24 h-24 sm:w-36 sm:h-36 bg-gray-300 rounded-lg hover:shadow-lg 
          transform hover:scale-105 transition duration-300"></div>
          <div className="w-24 h-24 sm:w-36 sm:h-36 bg-gray-300 rounded-lg hover:shadow-lg 
          transform hover:scale-105 transition duration-300"></div>
          <div className="w-24 h-24 sm:w-36 sm:h-36 bg-gray-300 rounded-lg hover:shadow-lg 
          transform hover:scale-105 transition duration-300"></div>
          {/* Weitere Platzhalter für Bilder */}
          <div className="w-24 h-24 sm:w-36 sm:h-36 bg-gray-300 rounded-lg hover:shadow-lg 
          transform hover:scale-105 transition duration-300"></div>
          <div className="w-24 h-24 sm:w-36 sm:h-36 bg-gray-300 rounded-lg hover:shadow-lg 
          transform hover:scale-105 transition duration-300"></div>
          <div className="w-24 h-24 sm:w-36 sm:h-36 bg-gray-300 rounded-lg hover:shadow-lg 
          transform hover:scale-105 transition duration-300"></div>
          <div className="w-24 h-24 sm:w-36 sm:h-36 bg-gray-300 rounded-lg hover:shadow-lg 
          transform hover:scale-105 transition duration-300"></div>
        </div>
      </div>
    </div>
  );
}