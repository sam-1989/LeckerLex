import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


function CategorySlider({ categories, selectedCategory, setSelectedCategory }) {
  

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,

    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          width: "100%",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-6">
      {/* Container for the slider */}
      <div className="max-w-screen-lg mx-auto mt- px-4 py-4 bg-green-50 border border-gray-200 rounded-full shadow-inner">
        <Slider {...sliderSettings}>
          {categories.map((category) => (
            <div key={category.id} className="p-2">
              {/* Category item */}
              <div
                className={`p-3 rounded-full cursor-pointer border border-gray-200 shadow-md text-center text-md font-book transition-transform
                   duration-200 focus:outline-none ${
                  selectedCategory === category.id
                    ? "bg-green-700 text-white"
                    : "bg-gray-50"
                } hover:bg-green-500 hover:text-white hover:scale-105`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default CategorySlider;
