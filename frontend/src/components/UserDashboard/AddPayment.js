import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../Styles/showDetails.css';

const AddPayment = ({ studentId, onClose }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const base_url = process.env.REACT_APP_BASE_URL;
  
  // console.log(studentId);
  // console.log(amount);
  // console.log(date);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${base_url}/user/payment`, {
        studentId,
        amount,
        paymentDate : date,
      }, { headers: {
        'Authorization': `Bearer ${Cookies.get('userAccessToken')}`
      } });
      onClose();
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Add Payment</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default AddPayment;
