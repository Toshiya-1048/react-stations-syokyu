import React from 'react';
import SearchSection from './SearchSection';
import ThreadList from './ThreadList';
import '../styles/Main.css';

const Main = () => {
  return (
    <main>
      <SearchSection />
      <ThreadList />
    </main>
  );
};

export default Main;
