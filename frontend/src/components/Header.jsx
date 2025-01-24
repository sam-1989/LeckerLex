import React from 'react'
import Navbar from "../components/Navbar";


function Header({ isDarkMode, toggleDarkMode}) {
  return (
    <header className={`bg-green-100 shadow-sm rounded-lg sticky top-0 z-50 ${isDarkMode ? 'dark' : 'light'} dark:bg-black`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
    </header>

  )
}

export default Header