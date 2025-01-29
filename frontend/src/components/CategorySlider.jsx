import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function CategorySlider({ categories, selectedCategory, setSelectedCategory }) {
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        type="button"
        className="absolute left-1/2 bottom-[-40px] transform -translate-x-[100%] text-black hover:scale-105 hover:text-green-500
         transition-transform duration-200 ease-in-out outline outline-1 outline-gray-300 bg-white rounded-full p-1 shadow-md"
        onClick={onClick}
      >
        <IoIosArrowBack size={24} />
      </button>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        type="button"
        className="absolute left-1/2 bottom-[-40px] transform translate-x-[100%] text-black hover:scale-105 hover:text-green-500
         transition-transform duration-200 ease-in-out outline outline-1 outline-gray-300 bg-white rounded-full p-1 shadow-md"
        onClick={onClick}
      >
        <IoIosArrowForward size={24} />
      </button>
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots) => (
      <div
        style={{
          position: "relative",
          bottom: "-50px",
          width: "100%",
        }}
      >
        {/* <ul style={{ margin: "0px" }}> {dots} </ul> */}
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <div className="p-4 text-center">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-gray-800 font-normal m-2 sm:mt-4">
          Or just pick them yourself directly out of the gallery
        </h3>
        <div
          className={`
          max-w-screen-lg mx-auto my-auto
          bg-green-200 border border-gray-200
          rounded-full shadow-inner relative
        `}
        >
          <Slider {...sliderSettings}>
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-3 flex justify-center items-center"
              >
                {/* Category item */}
                <div
                  className={`
                  md:p-2 rounded-full cursor-pointer border border-r-2 border-gray-200 shadow-md text-center text-md 
                  transition-transform duration-200 focus:outline-none
                  ${
                    selectedCategory === category.id
                      ? "bg-green-700 text-white"
                      : "bg-gray-50"
                  } 
                  hover:bg-green-500 hover:text-white hover:scale-105
                `}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default CategorySlider;
