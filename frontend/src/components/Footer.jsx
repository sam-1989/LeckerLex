import React, {useState} from 'react';
import {FaSearch, FaHeart, FaUser, FaHome, FaInstagram, FaFacebook, FaWhatsapp} from "react-icons/fa";

function Footer() {
  const [activeIcon, setActiveIcon] = useState(null);
  return (
    <>
    <footer className="bg-green-100 shadow-inner rounded-lg fixed bottom-0 w-full hidden md:block">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-600 flex items-center">
            © 2024 <a href="#" className="hover:underline ml-1">Logo</a>. All Rights Reserved.
            <span className="flex ml-4 space-x-2">
              <a href="#" className="hover:underline">
                <FaFacebook size={24} className='text-blue-600 hover:scale-125' />
              </a>
              <a href="#" className="hover:underline">
                <FaWhatsapp size={24} className='text-green-500 hover:scale-125' />
              </a>
              <a href="#" className="hover:underline">
                <FaInstagram size={24} className='text-pink-500 hover:scale-125' />
              </a>
            </span>
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-600 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
      </footer>

      {/* Navigationsleiste für mobile Geräte */}
      <nav className='bg-green-100 rounded-lg shadow-inner mx-auto fixed bottom-0 w-full md:hidden'>
        <ul className='flex justify-around p-4 text-sm font-medium text-gray-700'>
          <li>
            <a href="#" className={`hover:underline ${activeIcon === 'home' ? 'text-green-500' : ''}`} onClick={() => setActiveIcon('home')}>
              <FaHome size={18} />
            </a>
          </li>
          <li>
            <a href="#" className={`hover:underline ${activeIcon === 'search' ? 'text-green-500' : ''}`} onClick={() => setActiveIcon('search')}>
              <FaSearch size={18} />
            </a>
          </li>
          <li>
            <a href="#" className={`hover:underline ${activeIcon === 'heart' ? 'text-red-600' : ''}`} onClick={() => setActiveIcon('heart')}>
              <FaHeart size={18} />
            </a>
          </li>
          <li>
            <a href="#" className={`hover:underline ${activeIcon === 'user' ? 'text-green-500' : ''}`} onClick={() => setActiveIcon('user')}>
              <FaUser size={18} />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Footer;
