import React from 'react';
import ThreadListContainer from './ThreadListContainer';
import '../styles/ThreadList.css';

const ThreadList = () => {
  return (
    <section className="ThreadList">
      <div className="tabs-container">
        <div className="tabs">
          <button className="tab">ダミー</button>
          <button className="tab">ダミー</button>
          <button className="tab">ダミー</button>
          <button className="tab">ダミー</button>
        </div>
        <div className="thread-list-title">
          スレッド一覧
        </div>
      </div>
      <ThreadListContainer />
    </section>
  );
};

export default ThreadList;