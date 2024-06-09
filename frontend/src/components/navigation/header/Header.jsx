import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Mi Aplicación</h1>
      <nav>
        <ul>
          <li><a href="#tab1">Pestaña 1</a></li>
          <li><a href="#tab2">Pestaña 2</a></li>
          <li><a href="#tab3">Pestaña 3</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
