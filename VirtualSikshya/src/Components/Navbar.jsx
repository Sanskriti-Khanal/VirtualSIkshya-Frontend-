import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

// import './styles/Navbar.css'
import '../styles/Navbar.css';
import logoImage from '../assets/Images/navlogo.png'; // Ensure your logo image is in the correct path

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`header-area ${isMenuOpen ? "header-sticky" : ""}`}>
      
        <nav className="main-nav">
          {/* Logo */}
          <a href="/" className="logo">
            <img src={logoImage} alt="Scholar Logo" />
          </a>

          {/* Search Bar */}
          <div className="search-input">
            <input type="text" placeholder="Search..." />
            <i className="fa fa-search"></i>
          </div>

          {/* Navigation Menu */}
          <ul className={`nav ${isMenuOpen ? "open" : ""}`}>
            <li><a href="#top">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#team">Team</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#contact">Register</a></li>
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="menu-trigger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
          </div>
        </nav>
     
    </header>
  );
};

export default Navbar;
