import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className={`navbar-container ${menuOpen ? 'menu-open' : ''}`}>
      <nav className='maincontent'>
        <Link to="/" className="navbar-title">Mundo Fracciones</Link>
        <div className='navbarmenu' onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <Link className={location.pathname === "/graficos" ? "active" : ""} to="/graficos" onClick={handleLinkClick}>Gráficos</Link>
          </li>
          <li>
            <Link className={location.pathname === "/equivalentes" ? "active" : ""} to="/equivalentes" onClick={handleLinkClick}>Equivalentes</Link>
          </li>
          <li>
            <Link className={location.pathname === "/sumas-igual-denominador" ? "active" : ""} to="/sumas-igual-denominador" onClick={handleLinkClick}>Sumas de igual denominador</Link>
          </li>
          <li>
            <Link className={location.pathname === "/sumas-distinto-denominador" ? "active" : ""} to="/sumas-distinto-denominador" onClick={handleLinkClick}>Sumas de distinto denominador</Link>
          </li>
          <li>
            <Link className={location.pathname === "/multiplicacion" ? "active" : ""} to="/multiplicacion" onClick={handleLinkClick}>Multiplicación</Link>
          </li>
          <li>
            <Link className={location.pathname === "/division" ? "active" : ""} to="/division" onClick={handleLinkClick}>División</Link>
          </li>
          <li>
            <Link className={location.pathname === "/potenciacion" ? "active" : ""} to="/potenciacion" onClick={handleLinkClick}>Potenciación</Link>
          </li>
          <li>
            <Link className={location.pathname === "/radicacion" ? "active" : ""} to="/radicacion" onClick={handleLinkClick}>Radicación</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
