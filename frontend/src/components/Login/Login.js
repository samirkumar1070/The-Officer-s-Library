import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../Styles/loginRegister.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // New state for toggling admin/user
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setMessage(""); // Reset success message

    try {
      const url = isAdmin ? 'http://localhost:5000/admin/login' : 'http://localhost:5000/user/login';
      const response = await axios.post(url, { email, password });
      // Set accessToken in the cookie
      const tokenName = isAdmin ? 'adminAccessToken' : 'userAccessToken';
      Cookies.set(tokenName, response.data.accessToken, { secure: true, sameSite: 'Strict' });
      // Set email in the cookie
      const emailKey = isAdmin ? 'adminEmail' : 'userEmail';
      Cookies.set(emailKey, email, { secure: true, sameSite: 'Strict' });
      // Navigate to the appropriate dashboard
      navigate(isAdmin ? '/admin' : '/user');
    } catch (error) {
      console.error('Login failed', error);
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg); // Show specific error message from backend
      } else {
        setError('Invalid Credentials');
      }
    }
  }

  return (
    <div className='login-container'>
      <div className='modal'>
        <h2>{isAdmin ? 'Admin Login' : 'User Login'}</h2>
        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <label className='label'>Email Id:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='input' />
          </div>
          <div className='form-group'>
            <label className='label'>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input' />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {message && <p style={{ color: 'green' }}>{message}</p>}
          <button type='submit' className='button'>Submit</button>
        </form>
        <button onClick={() => setIsAdmin(!isAdmin)} className='toggle-button'>
          {isAdmin ? 'Switch to User Login' : 'Switch to Admin Login'}
        </button>
      </div>
    </div>
  )
}

export default Login;