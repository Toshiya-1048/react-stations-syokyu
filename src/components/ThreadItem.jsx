import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ThreadItem.css';

const ThreadItem = ({ id, title }) => {
  return (
    <article className="thread-item">
      <h3>
        <Link to={`/threads/${id}`}>{title}</Link>
      </h3>
    </article>
  );
};

export default ThreadItem;