import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/loginRegister.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(""); // New field for user registration
  const [location, setLocation] = useState(""); // New field for user registration
  const [mobile, setMobile] = useState(""); // New field for user registration
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // New state for toggling admin/user

  const base_url = process.env.REACT_APP_BASE_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setMessage(""); // Reset success message

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const url = isAdmin ? `${base_url}/admin/register` : `${base_url}/user/register`;
      const res = await axios.post(url, {
        email,
        password,
        ...(isAdmin ? {} : { username, location, mobile }) // Only include these fields for user registration
      });
      setMessage(res.data.msg); // Use the message from the backend
      // Clear form fields after successful registration
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUsername(""); // Clear the new field
      setLocation(""); // Clear the new field
      setMobile(""); // Clear the new field
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg); // Show specific error message from backend
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className='register-container'>
      <div className='modal'>
        <h2>{isAdmin ? 'Register Admin' : 'Register User'}</h2>
        <form onSubmit={handleRegister}>
          <div className='form-group'>
            <label className='label'>Enter Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className='input' />
          </div>
          <div className='form-group'>
            <label className='label'>Enter Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className='input' />
          </div>
          <div className='form-group'>
            <label className='label'>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className='input' />
          </div>
          {!isAdmin && (
            <>
              <div className='form-group'>
                <label className='label'>Enter Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className='input' />
              </div>
              <div className='form-group'>
                <label className='label'>Enter Location:</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className='input' />
              </div>
              <div className='form-group'>
                <label className='label'>Enter Mobile Number:</label>
                <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} required className='input' />
              </div>
            </>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {message && <p style={{ color: 'green' }}>{message}</p>}
          <button type="submit" className='button'>Submit</button>
        </form>
        <button onClick={() => setIsAdmin(!isAdmin)} className='toggle-button'>
          {isAdmin ? 'Switch to User Registration' : 'Switch to Admin Registration'}
        </button>
      </div>
    </div>
  );
};

export default Register;
