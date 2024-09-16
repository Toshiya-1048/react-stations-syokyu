import React, { useState } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <h1>
          <Link to="/">掲示板サイト</Link>
        </h1>
      </div>
      <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="#">ダミー</a></li>
          <li><a href="#">ダミー</a></li>
          <li><a href="#">ダミー</a></li>
          <li><a href="#">ダミー</a></li>
        </ul>
      </nav>
      <div className="create-thread">
        <Link to="/threads/new" className="create-thread-button">スレッド作成</Link>
      </div>
    </header>
  );
};

export default Header;
