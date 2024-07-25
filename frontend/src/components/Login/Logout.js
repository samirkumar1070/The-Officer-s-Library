import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const email = 'sam123@gmail.com'; // Replace with the actual email of the logged-in admin
      await axios.post('http://localhost:5000/logout', { email });
      //localStorage.removeItem('token');
      Cookies.remove('accessToken'); 
      navigate('/');
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
