import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './style.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            //setting accesstoken in the localstorage
            //localStorage.setItem('token', response.data.accessToken);
            //setting accessToken in the cookie 
            Cookies.set('accessToken', response.data.accessToken, { secure: true, sameSite: 'Strict' });
            //Cookies.set('refreshToken', response.data.refreshToken, { secure: true, sameSite: 'Strict' });
            navigate('/admin');
        } catch (error) {
            console.error('login failed', error);
            alert('Invalid Credentials');
        }
    }

    return (
        <div className='login-container'>
            <form onSubmit={handleLogin} className='login-box'>
                <label className='label'>Email Id: 
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='input' />
                </label>
                <label className='label'>Password: 
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input' />
                </label>
                <button type='submit' className='button'>Submit</button>
            </form>
        </div>
    )
}

export default Login;
