import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ThreadListPage from './ThreadListPage';
import CreateThread from './CreateThread';
import "../styles/Main.css"

const Main = () => {
  return (
    <main>
      <Routes>
        {/* スレッド一覧ページ */}
        <Route path="/" element={<ThreadListPage />} />
        {/* スレッド作成ページ */}
        <Route path="threads/new" element={<CreateThread />} />
      </Routes>
    </main>
  );
};

export default Main;
