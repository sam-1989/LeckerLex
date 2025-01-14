import React from "react";
import Slider from "react-slick";
import {Swiper, SwiperSlide} from "swiper/react";
import  {Navigation, Pagination} from "swiper/modules";
import "swiper/css";              // Haupt-CSS für Swiper  
import "swiper/css/navigation";   // Navigation-CSS
import "swiper/css/pagination";   // Pagination-CSS

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Installation Swiper modules

// SwiperCore.use([Navigation, Pagination]);


// const PrevArrow = (props) => {
//   const { onClick } = props;
//   return (
//     <div
//       className="absolute -left-6 top-1/3 transform -translate-y-1/2 cursor-pointer"
//       onClick={onClick}
//     >
//       <FaArrowLeft className="text-2xl text-gray-800 hover:text-gray-600" />
//     </div>
//   );
// };

// const NextArrow = (props) => {
//   const { onClick } = props;
//   return (
//     <div
//       className="absolute -right-6 top-1/3 transform -translate-y-1/2 cursor-pointer"
//       onClick={onClick}
//     >
//       <FaArrowRight className="text-2xl text-gray-800 hover:text-gray-600" />
//     </div>
//   );
// };

function CategorySlider({ categories, selectedCategory, setSelectedCategory }) {
  // const sliderSettings = {
  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 3,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 4,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 3,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 2,
  //       },
  //     },
  //   ],
  // };

  return (
    <div className="py-4">
    <div className="max-w-screen-lg mx-auto mt-6 px-4">
      {/* Container für Pfeile und Punkte über den Bildern */}
      <div className="flex items-center justify-center mb-4 space-x-4">
        <div className="swiper-button-prev cursor-pointer bg-gray-200 px-3 py-1 rounded-full" />
        <div className="swiper-pagination" />
        <div className="swiper-button-next cursor-pointer bg-gray-200 px-3 py-1 rounded-full" />
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        speed={600}
        loop={true}
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          1024: { slidesPerView: 4 },
          768: { slidesPerView: 3 },
          480: { slidesPerView: 2 },
        }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <button
              onClick={() => setSelectedCategory(category)}
              className={`w-full py-2 rounded-xl text-gray-900 text-sm text-center transform hover:scale-105 transition duration-300 ${
                selectedCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-green-400"
              }`}
            >
              {category}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
  );
}

export default CategorySlider;
