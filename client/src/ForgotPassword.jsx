import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/forgot-password', { email });
            setMessage(response.data.message);
        } catch (err) {
            setError("Failed to send reset link. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" 
        style={{ background: 'linear-gradient(135deg, #73c8a9, #373b44)', color: '#fff' }}>
            <div className="bg-white p-5 rounded shadow-lg w-50" style={{ maxWidth: '500px', borderRadius: '15px' }}>
                <h2 className="text-center mb-4" style={{ color: '#373b44' }}>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input 
                            type="email" 
                            placeholder='Enter your email' 
                            className="form-control" 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    {message && <p className="text-success text-center">{message}</p>}
                    {error && <p className="text-danger text-center">{error}</p>}
                    <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#373b44', border: 'none' }}>
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
