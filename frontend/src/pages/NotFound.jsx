import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  
  return (
    <section className="page_404 flex items-center justify-center min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 Background"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="absolute top-8 right-8 text-right z-10">
        <div className="four_zero_four_bg">
          <h1 className="text-9xl font-bold text-black mb-10 drop-shadow-lg">
            404
          </h1>
        </div>
        <div className="contant_box_404">
          <h3 className="text-4xl font-semibold text-black mb-10 drop-shadow-lg">
            Oops... Page not found,
            <br />
            Maybe it was lost in the Stone Age...
          </h3>
          <p>Or maybe it was eaten by a dinosaur...</p>
        </div>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center z-10">
        <NavLink
        to="/"
          className="text-white bg-green-600 py-3 px-6 rounded-full hover:scale-105
          transition hover:bg-green-700 text-lg"
        >
          Go back to the civilization
        </NavLink>
      </div>
    </section>
  );
}

export default NotFound;
