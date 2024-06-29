import React from 'react';
import './card.css';

const Card = ({ title, value }) => {
  return (
    <div className="weather-card">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
};

export default Card;
