import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div id="root">
        <Header />
        <Main /> {/* Mainコンポーネントを直接レンダリング */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;