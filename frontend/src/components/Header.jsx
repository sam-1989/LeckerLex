import React from 'react'
import Navbar from "../components/Navbar";


function Header() {
  return (
    <header className="sticky top-0 z-50 bg-green-100 shadow-inner rounded-lg overflow-hidden">
      <Navbar />
    </header>
  )
}

export default Header