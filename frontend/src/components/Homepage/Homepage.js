import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Card from "./Card";
import Footer from './Footer';
import Register from "../Register/Registration";
import Login from "../Login/Login";
import '../Styles/homepage.css';

function Homepage() {
    const [showLoginBox, setShowLoginBox] = useState(false);
    const [showRegisterBox, setShowRegisterBox] = useState(false);
    const [studentCounts, setStudentCounts] = useState([]);
    const [error, setError] = useState('');
    const TotalSeats = 45;

    useEffect(() => {
        const fetchStudentCounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/countStudentsByTimeSlot', { withCredentials: true });
                setStudentCounts(response.data);
            } catch (error) {
                console.error('Error fetching student counts:', error);
                setError('Failed to get student counts');
            }
        };
        fetchStudentCounts();
    }, []);

    const handleLoginClick = () => {
        setShowLoginBox(!showLoginBox);
    };

    const handleRegisterClick = () => {
        setShowRegisterBox(!showRegisterBox);
    };

    const getCountForTimeSlot = (time) => {
        const slot = studentCounts.find(slot => slot._id === time);
        return slot ? slot.count : 0;
    };

    if(error){
        console.log(error);
    }

    return (
        <div className="homepage">
            <Header />
            <div className="bottomHeaders">
                <h1>Welcome to the library</h1>
                <button className="button-85" onClick={handleRegisterClick}>Register</button>
                {showRegisterBox && <Register />}
                <button className="button-85" onClick={handleLoginClick}>Login</button>
                {showLoginBox && <Login />}
            </div>
            <div className="tiles">
                <Card time="06:00AM-10:00AM" availableSeats={TotalSeats-getCountForTimeSlot('s1')} color="green" />
                <Card time="10:00AM-02:00PM" availableSeats={TotalSeats-getCountForTimeSlot('s2')} color="blue" />
                <Card time="02:00PM-06:00PM" availableSeats={TotalSeats-getCountForTimeSlot('s3')} color="red" />
                <Card time="06:00AM-02:00PM" availableSeats={TotalSeats-getCountForTimeSlot('s4')} color="orange" />
                {/* Add more cards for other time slots as needed */}
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
}

export default Homepage;
