import React from 'react';
import '../styles/PaginationButton.css';

const PaginationButton = ({ onClick }) => (
    <button className="load-more" onClick={onClick}>
      次の10件
    </button>
  );
  

export default PaginationButton;