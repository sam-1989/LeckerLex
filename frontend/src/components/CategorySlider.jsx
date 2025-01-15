import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

function CategorySlider({ categories, selectedCategory, setSelectedCategory }) {
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 400,
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

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} bg-gray-200 rounded-full flex items-center justify-center`}
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} bg-gray-200 rounded-full`}
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      />
    );
  }

  return (
    <div className="py-4">
      <div className="max-w-screen-lg mx-auto mt-4 px-4">
        <Slider {...sliderSettings}>
          {categories.map((category) => (
            <div key={category.id} className="p-2">
              <div
                className={`p-2 rounded-xl cursor-pointer shadow-md border-r-0 ${
                  selectedCategory === category.id ? 'bg-green-500 text-white' : 'bg-gray-100'
                }`}
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