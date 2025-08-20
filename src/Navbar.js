/* src/Navbar.js */
import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onNavLinkClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <a href="#" className="navbar-logo" onClick={() => onNavLinkClick('home')}><img src="/resource/tgpm-logo-big.png" alt="Company Logo" className="company-logo" /></a>
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><a href="#" onClick={() => onNavLinkClick('home')}>Home</a></li>
        <li><a href="#" onClick={() => onNavLinkClick('file-upload')}>Update</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;