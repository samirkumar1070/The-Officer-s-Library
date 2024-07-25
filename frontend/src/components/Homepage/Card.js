import React from 'react';
import '../Styles/homepage.css';

const Card = ({ time, availableSeats, color }) => {
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <div className="time">Time : {time}</div>
      <div className="seats">Available Seats: {availableSeats}</div>
    </div>
  );
};

export default Card;
