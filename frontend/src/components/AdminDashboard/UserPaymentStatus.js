import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import '../Styles/paymentStatus.css';

const UserPaymentStatus = ({ userId, onClose }) => {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const base_url = process.env.REACT_APP_BASE_URL;
        const response = await axios.get(`${base_url}/admin/getpayment/${userId}`, {
          withCredentials: true
        });
        setPaymentDetails(response.data);
      } catch (error) {
        console.error('Error fetching payment details:', error);
        setError('Failed to get payment details');
      }
    };

    fetchPaymentDetails();
  }, [userId]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
  };
  
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Payment Status</h2>
        <button type="button" onClick={onClose}>Close</button>
        <table className="payment-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentDetails.map(payment => (
              <tr key={payment._id}>
                <td>{payment.amount}</td>
                <td>{formatDate(payment.paymentDate)}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPaymentStatus;
