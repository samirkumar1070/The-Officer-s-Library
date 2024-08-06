import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Logout from '../Login/Logout.js';
import '../Styles/adminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
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
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.isActive ? 'Active' : 'Blocked'}</td>
              <td>
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
    </div>
  );
};

export default AdminDashboard;
