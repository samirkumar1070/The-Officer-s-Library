import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./Header";
import Card from "./Card";
import Footer from './Footer';
import Register from "../Register/Registration";
import Login from "../Login/Login";
import Cookies from 'js-cookie';
import '../Styles/homepage.css';

function Homepage() {
    const [showLoginBox, setShowLoginBox] = useState(false);
    const [showRegisterBox, setShowRegisterBox] = useState(false);
    const [studentCounts, setStudentCounts] = useState([]);
    const [error, setError] = useState('');
    const TotalSeats = 45;

    const overlayRef = useRef(null);

    const base_url = process.env.REACT_APP_BASE_URL;

    //console.log("base url",base_url);

    useEffect(() => {
        const fetchStudentCounts = async () => {
            try {
                const response = await axios.get(`${base_url}/user/countStudentsByTimeSlot`, { 
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('userAccessToken')}`
                      }
                 });
                setStudentCounts(response.data);
                console.log(response.data); // Add this line to debug the response
            } catch (error) {
                console.error('Error fetching student counts:', error);
                setError('Failed to get student counts');
            }
        };
        fetchStudentCounts();
    });

    const handleLoginClick = () => {
        setShowLoginBox(!showLoginBox);
        if (showRegisterBox) setShowRegisterBox(false);
    };

    const handleRegisterClick = () => {
        setShowRegisterBox(!showRegisterBox);
        if (showLoginBox) setShowLoginBox(false);
    };

    const handleClickOutside = (event) => {
        if (overlayRef.current && !overlayRef.current.contains(event.target)) {
            setShowLoginBox(false);
            setShowRegisterBox(false);
        }
    };

    useEffect(() => {
        if (showLoginBox || showRegisterBox) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showLoginBox, showRegisterBox]);

    const getCountForTimeSlot = (time) => {
        const slot = studentCounts.find(slot => slot._id === time);
        return slot ? slot.count : 0;
    };

    if (error) {
        console.log(error);
    }

    return (
        <div className="homepage">
            <Header />
            <div className="top-right-buttons">
                <button className="button-85" onClick={handleRegisterClick}>Register</button>
                <button className="button-85" onClick={handleLoginClick}>Login</button>
            </div>
            <div className={`main-content ${showLoginBox || showRegisterBox ? 'blur-background' : ''}`}>
                <div className="bottomHeaders">
                    <h1>Welcome To The Officer's Library</h1>
                </div>
                <div className="tiles">
                    <Card time="06:00AM-10:00AM" availableSeats={TotalSeats - getCountForTimeSlot('s1')} color="green" />
                    <Card time="10:00AM-02:00PM" availableSeats={TotalSeats - getCountForTimeSlot('s2')} color="blue" />
                    <Card time="02:00PM-06:00PM" availableSeats={TotalSeats - getCountForTimeSlot('s3')} color="red" />
                    <Card time="06:00AM-02:00PM" availableSeats={TotalSeats - getCountForTimeSlot('s4')} color="orange" />
                    <Card time="10:00AM-06:00PM" availableSeats={TotalSeats - getCountForTimeSlot('s5')} color="violet" />
                    <Card time="02:00PM-10:00PM" availableSeats={TotalSeats - getCountForTimeSlot('s6')} color="maroon" />
                    <Card time="06:00PM-10:00PM" availableSeats={TotalSeats - getCountForTimeSlot('s7')} color="cyan" />
                    <Card time="12:00PM-04:00PM" availableSeats={TotalSeats - getCountForTimeSlot('s8')} color="silver" />
                    {/* Add more cards for other time slots as needed */}
                </div>
                <div>
                    <Footer />
                </div>
            </div>
            {showRegisterBox && (
                <div className="overlay">
                    <div className="modal" ref={overlayRef}>
                        <Register />
                    </div>
                </div>
            )}
            {showLoginBox && (
                <div className="overlay">
                    <div className="modal" ref={overlayRef}>
                        <Login />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Homepage;