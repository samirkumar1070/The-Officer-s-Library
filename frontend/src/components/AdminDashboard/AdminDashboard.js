import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Logout from '../Login/Logout.js';
import AddUserPayment from './AddUserPayment';
import UserPaymentStatus from './UserPaymentStatus';
import '../Styles/adminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isPaymentStatusOpen, setIsPaymentStatusOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/users', {
        headers: {
          'Authorization': `Bearer ${Cookies.get('adminAccessToken')}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
      setError('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlock = async (id) => {
    try {
      await axios.put(`http://localhost:5000/admin/block/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('adminAccessToken')}`
        }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error blocking user', error);
      setError('Error blocking user');
    }
  };

  const handleUnblock = async (id) => {
    try {
      await axios.put(`http://localhost:5000/admin/unblock/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('adminAccessToken')}`
        }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error unblocking user', error);
      setError('Error unblocking user');
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('adminAccessToken')}`
        }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error removing user', error);
      setError('Error removing user');
    }
  };

  const handleAddPaymentClick = (userId) => {
    setSelectedUserId(userId);
    setIsAddPaymentOpen(true);
  };

  const handlePaymentStatusClick = (userId) => {
    setSelectedUserId(userId);
    setIsPaymentStatusOpen(true);
  };

  const handleHomeClick = () => {
    navigate('/'); // Redirect to home page
  };

  return (
    <div className='admin-dashboard'>
      <nav className='navbar'>
        <button onClick={handleHomeClick}>Home</button>
        <div className='logout-button'><Logout /></div>
      </nav>

      <h1>Admin Dashboard</h1>
      {error && <p className='error'>{error}</p>}
      <table className='users-table'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.location}</td>
              <td>{user.isActive ? 'Active' : 'Blocked'}</td>
              <td>
                <button onClick={() => handleAddPaymentClick(user._id)}>Add Payment</button>
                <button onClick={() => handlePaymentStatusClick(user._id)}>Payment Status</button>
                {user.isActive ? (
                  <button onClick={() => handleBlock(user._id)}>Block</button>
                ) : (
                  <button onClick={() => handleUnblock(user._id)}>Unblock</button>
                )}
                <button onClick={() => handleRemove(user._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAddPaymentOpen && <AddUserPayment userId={selectedUserId} onClose={() => setIsAddPaymentOpen(false)} />}
      {isPaymentStatusOpen && <UserPaymentStatus userId={selectedUserId} onClose={() => setIsPaymentStatusOpen(false)} />}
    </div>
  );
};

export default AdminDashboard;
