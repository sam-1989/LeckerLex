import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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

function CategorySlider({ categories, selectedCategory, setSelectedCategory }) {
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

  return (
    <div className="py-4">
      <div className="max-w-screen-lg mx-auto mt-6 px-4 relative">
        <Slider {...sliderSettings} className="category-slider">
          {categories.map((category, index) => (
            <div key={index} className="flex justify-center px-2 shadow-sm">
              <button
                onClick={() => setSelectedCategory(category)}
                className={`w-full py-2 rounded-xl text-gray-900 text-sm text-center transform hover:scale-105 transition duration-300 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white rounded-xl'
                    : 'bg-green-400'
                }`}
              >
                {category}
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default CategorySlider;
