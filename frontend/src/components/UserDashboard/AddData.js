import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/user.css';

const AddData = () => {
    const [formData, setFormData] = useState({
        seatno: "",
        name: "",
        fathername: "",
        address: "",
        mobile: "",
        time: "",
        doj: ""
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/user/add', { ...formData }, { withCredentials: true });
            if (response.status === 201) {
                setMessageType('success');
                setMessage("Data saved successfully");
                // Reset form fields
                setFormData({
                    seatno: "",
                    name: "",
                    fathername: "",
                    address: "",
                    mobile: "",
                    time: "",
                    doj: ""
                });
            } else {
                setMessageType('error');
                setMessage("Failed to save data");
            }
        } catch (error) {
            setMessageType('error');
            setMessage('Error: ' + (error.response?.data?.message || "Failed to save data"));
        }
    }

    return (
        <div className='div1'>
            {message && (
                <div className={`message ${messageType}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className='form'>
                <label>Seat Number :
                    <input type="number" name='seatno' value={formData.seatno} onChange={handleChange} required />
                </label>
                <label>Name :
                    <input type='text' name='name' value={formData.name} onChange={handleChange} required />
                </label>
                <label>Father's Name :
                    <input type='text' name='fathername' value={formData.fathername} onChange={handleChange} />
                </label>
                <label>Address :
                    <input type='text' name='address' value={formData.address} onChange={handleChange} />
                </label>
                <label>Mobile :
                    <input type='number' name='mobile' value={formData.mobile} onChange={handleChange} />
                </label>
                <label>Timing :
                    <select name='time' value={formData.time} onChange={handleChange}>
                        <option value="">Select-An-Option</option>
                        <option value="s1">06:00AM-10:00AM</option>
                        <option value="s2">10:00AM-02:00PM</option>
                        <option value="s3">02:00PM-06:00PM</option>
                        <option value="s4">06:00AM-02:00PM</option>
                        <option value="s5">10:00AM-06:00PM</option>
                        <option value="s6">02:00PM-10:00PM</option>
                        <option value="s7">06:00PM-10:00PM</option>
                        <option value="s8">12:00PM-04:00PM</option>
                        <option value="s9">10:00PM-05:00AM</option>
                        <option value="s10">24 HOURS</option>
                    </select>
                </label>
                <label>Date of Joining :
                    <input type='date' name='doj' value={formData.doj} onChange={handleChange} />
                </label>
                <button type='submit' className='button'>Submit</button>
            </form>
        </div>
    )
}

export default AddData;