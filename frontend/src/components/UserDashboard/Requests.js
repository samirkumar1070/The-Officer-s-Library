import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../Styles/showDetails.css';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const base_url = process.env.REACT_APP_BASE_URL;
        const response = await axios.get(`${base_url}/user/admissionrequests`, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('userAccessToken')}`
          }
        });
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError('Failed to get requests');
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      const base_url = process.env.REACT_APP_BASE_URL;
      await axios.put(`${base_url}/user/requests/accept/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('userAccessToken')}`
        }
      });
      setRequests(requests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error accepting request:', error);
      setError('Failed to accept request');
    }
  };  

  const handleReject = async (id) => {
    try {
      const base_url = process.env.REACT_APP_BASE_URL;
      await axios.delete(`${base_url}/user/requests/reject/${id}`,{
        headers: {
          'Authorization': `Bearer ${Cookies.get('userAccessToken')}`
        }
      });
      setRequests(requests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Error rejecting request:', error);
      setError('Failed to reject request');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Pending Admission Requests</h2>
      <div className="table-container">
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
            {requests.map(request => (
              <tr key={request._id}>
                <td>{request.seatno}</td>
                <td>{request.name}</td>
                <td>{request.fathername}</td>
                <td>{request.mobile}</td>
                <td>{request.address}</td>
                <td>{new Date(request.doj).toLocaleDateString()}</td>
                <td className="action-buttons">
                  <button className="accept" onClick={() => handleAccept(request._id)}>Accept</button>
                  <button className="reject" onClick={() => handleReject(request._id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
