import React from 'react';
import '../styles/SearchSection.css';

const SearchSection = () => {
  return (
    <section className="search-section">
      <input type="text" placeholder="ダミーです" />
      <button>検索</button>
    </section>
  );
};

export default SearchSection;
