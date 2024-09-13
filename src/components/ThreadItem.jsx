import React from 'react';
import '../styles/ThreadItem.css';

const ThreadItem = ({ title }) => {
  return (
    <article className="thread-item">
      <h3>{title}</h3>
    </article>
  );
};

export default ThreadItem;
