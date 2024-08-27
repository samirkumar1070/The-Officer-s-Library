import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import AddPayment from './AddPayment';
import PaymentStatus from './PaymentStatus';
import '../Styles/showDetails.css';

const ShowDetails = () => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [error, setError] = useState('');
  const [time, setTime] = useState('');
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isPaymentStatusOpen, setIsPaymentStatusOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const base_url = process.env.REACT_APP_BASE_URL;
        const response = await axios.get(`${base_url}/user/view`, {
          params: { time },
          withCredentials: true
        });
        setStudentDetails(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to get data');
      }
    };

    fetchDetails();
  }, [time]);

  const handleTimeClick = (selectedTime) => {
    setTime(selectedTime);
  };

  const handleDelete = async (id) => {
    try {
      const base_url = process.env.REACT_APP_BASE_URL;
      const response = await axios.delete(`${base_url}/user/delete/${id}`, { withCredentials: true });
      if (response.status === 200) {
        setStudentDetails(studentDetails.filter(sub => sub._id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item');
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
  };

  const handleAddPaymentClick = (studentId) => {
    setSelectedStudentId(studentId);
    setIsAddPaymentOpen(true);
  };

  const handlePaymentStatusClick = (studentId) => {
    setSelectedStudentId(studentId);
    setIsPaymentStatusOpen(true);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Students' List</h2>
      <div>
        <button onClick={() => handleTimeClick('s1')}>06:00AM-10:00AM</button>
        <button onClick={() => handleTimeClick('s2')}>10:00AM-02:00PM</button>
        <button onClick={() => handleTimeClick('s3')}>02:00PM-06:00PM</button>
        <button onClick={() => handleTimeClick('s4')}>06:00AM-02:00PM</button>
        <button onClick={() => handleTimeClick('s5')}>10:00AM-06:00PM</button>
        <button onClick={() => handleTimeClick('s6')}>02:00PM-10:00PM</button>
        <button onClick={() => handleTimeClick('s7')}>06:00PM-10:00PM</button>
        <button onClick={() => handleTimeClick('s8')}>12:00PM-04:00PM</button>
        <button onClick={() => handleTimeClick('s9')}>10:00PM-05:00AM</button>
        <button onClick={() => handleTimeClick('s10')}>24 HOURS</button>
      </div>
      <div className={`table-container ${isAddPaymentOpen || isPaymentStatusOpen ? 'blur-background' : ''}`}>
        <table>
          <thead>
            <tr>
              <th>Seat No</th>
              <th>Name</th>
              <th>Father's Name</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Date of Joining</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentDetails.map(sub => (
              <tr key={sub._id}>
                <td>{sub.seatno}</td>
                <td>{sub.name}</td>
                <td>{sub.fathername}</td>
                <td>{sub.mobile}</td>
                <td>{sub.address}</td>
                <td>{formatDate(sub.doj)}</td>
                <td className="action-buttons">
                  <button className="add-payment" onClick={() => handleAddPaymentClick(sub._id)}>Add Payment</button>
                  <button className="view-status" onClick={() => handlePaymentStatusClick(sub._id)}>Payment Status</button>
                  <button className="delete" onClick={() => handleDelete(sub._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAddPaymentOpen && <AddPayment studentId={selectedStudentId} onClose={() => setIsAddPaymentOpen(false)} />}
      {isPaymentStatusOpen && <PaymentStatus studentId={selectedStudentId} onClose={() => setIsPaymentStatusOpen(false)} />}
    </div>
  );
};

export default ShowDetails;