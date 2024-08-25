import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const userEmail = Cookies.get('userEmail');
      const adminEmail = Cookies.get('adminEmail');

      const base_url = process.env.REACT_APP_BASE_URL;


      if (userEmail) {
        await axios.post(`${base_url}/user/logout`, { email: userEmail });
        // Clear user-related cookies
        Cookies.remove('userEmail');
        Cookies.remove('userAccessToken');
        navigate('/');
      } else if (adminEmail) {
        await axios.post(`${base_url}/admin/logout`, { email: adminEmail });
        // Clear admin-related cookies
        Cookies.remove('adminEmail');
        Cookies.remove('adminAccessToken');
        navigate('/');
      } else {
        console.error('No logged-in user or admin found');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className='logout'>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
