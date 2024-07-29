import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setMessage(""); // Reset success message

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/register', { email, password });
      setMessage(res.data.msg); // Use the message from the backend
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
      <form onSubmit={handleRegister} className='register-box'>
        <div>
          <label className='label'>Enter Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className='label'>Enter Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label className='label'>Confirm Password: </label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <button type="submit" className='button'>Submit</button>
      </form>
    </div>
  );
};

export default Register;
