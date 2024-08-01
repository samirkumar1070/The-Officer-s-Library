import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns'; // Import the format function from date-fns
import '../Styles/homepage.css'; // Ensure the CSS file is correctly imported

const ShowDetails = () => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [error, setError] = useState('');
  const [time, setTime] = useState(''); // State to hold selected time

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/view', {
          params: { time }, // Send 'time' parameter in query
          withCredentials: true
        });
        setStudentDetails(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to get data');
      }
    };

    fetchDetails();
  }, [time]); // Fetch details when 'time' changes

  const handleTimeClick = (selectedTime) => {
    setTime(selectedTime); // Set the time and trigger useEffect
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete/${id}`, { withCredentials: true });
      if (response.status === 200) {
        setStudentDetails(studentDetails.filter(sub => sub._id !== id)); // Remove deleted item from state
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item');
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
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
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Seat No</th>
              <th>Name</th>
              <th>Father's Name</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Date of Joining</th>
              <th>Actions</th> {/* Column for delete buttons */}
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
                <td>
                  <button onClick={() => handleDelete(sub._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowDetails;