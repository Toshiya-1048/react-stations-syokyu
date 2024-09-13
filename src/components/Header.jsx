import React, { useState } from 'react';
import '../styles/Header.css';

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
        <h1>掲示板サイト</h1>
      </div>
      <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="#">ホーム</a></li>
          <li><a href="#">通知</a></li>
          <li><a href="#">コミュニティ</a></li>
          <li><a href="#">アカウント</a></li>
        </ul>
      </nav>
      <div className="create-thread">
        <a href="#">スレッド作成</a>
      </div>
    </header>
  );
};

export default Header;
