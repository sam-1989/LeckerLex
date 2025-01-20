import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} bg-gray-800 bg-opacity-20 rounded-full flex justify-center items-center cursor-pointer z-10`}
      style={{
        ...style,
        display: "block",
        right: "10px",
        width: "30px",
        height: "30px",
      }}
      onClick={onClick}
      aria-label="Next"
      inert
    >
      <span className="block w-2.5 h-2.5 border-t-2 border-r-2 border-white transform rotate-45"></span>
    </div>
  );
}

function PrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className={`${className} bg-gray-800 bg-opacity-20 rounded-full flex justify-center items-center cursor-pointer z-10`}
      style={{
        ...style,
        display: "block",
        left: "10px",
        width: "30px",
        height: "30px",
      }}
      onClick={onClick}
      aria-label="Previous"
      inert
    >
      <span className="block w-2.5 h-2.5 border-t-2 border-r-2 border-white transform rotate-45"></span>
    </div>
  );
}

function CategorySlider({ categories, selectedCategory, setSelectedCategory }) {
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory, setSelectedCategory]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,

    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          width: "100%",
        }}
      >
        <ul style={{ margin: "4px" }}> {dots} </ul>
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
    <div className="py-4">
      {/* Container for the slider */}
      <div className="max-w-screen-lg mx-auto mt-3 p-3 bg-green-50 rounded-full shadow-inner">
        <Slider {...sliderSettings}>
          {categories.map((category) => (
            <div key={category.id} className="p-2">
              {/* Category item */}
              <div
                className={`p-2 rounded-full cursor-pointer shadow-md text-center text-md font-book transition-transform duration-300 focus:outline-none ${
                  selectedCategory === category.id
                    ? "bg-green-700 text-white"
                    : "bg-gray-200"
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
