import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-next-arrow`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}

function CategorySlider({ categories, selectedCategory, setSelectedCategory }) {
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => (
      <button className="focus:outline-none">
        {categories[i] ? categories[i].name : `Page ${i + 1}`}
      </button>
    ),
    appendDots: (dots) => (
      <ul className="flex justify-center space-x-2 mt-4">{dots}</ul>
    ),
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
      <div className="max-w-screen-lg mx-auto mt-4 px-4">
        <Slider {...sliderSettings}>
          {categories.map((category) => (
            <div key={category.id} className="p-2">
              <div
                className={`p-2 rounded-lg cursor-pointer shadow-md border-r-0 text-center font-book ${
                  selectedCategory === category.id ? 'bg-green-700 text-slate-50' : 'bg-gray-200'
                } hover:bg-green-500 hover:text-slate-50 hover:scale-105`}
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