import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');  
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/auth/send-otp', { email });
            setOtpSent(true); // OTP sent successfully
        } catch (error) {
            setError("Failed to send OTP. Please try again.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!otpSent) {
            handleSendOtp();
        } else {
            axios.post("http://localhost:3001/api/auth/register", { name, email, password, role, otp })
            .then(() => navigate("/login"))
            .catch(err => {
                setError(err.response?.data?.message || "Registration failed. Please try again.");
            });
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" 
             style={{ background: 'linear-gradient(135deg, #73c8a9, #373b44)', color: '#fff' }}>
            <div className="bg-white p-5 rounded shadow-lg w-50" style={{ maxWidth: '500px', borderRadius: '15px' }}>
                <h2 className="text-center mb-4" style={{ color: '#373b44' }}>Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input 
                            type="text" 
                            placeholder='Enter your name' 
                            className="form-control" 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            placeholder='Create a password' 
                            className="form-control" 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Select Role</label>
                        <select 
                            className="form-control" 
                            onChange={(e) => setRole(e.target.value)} 
                            required
                        >
                            <option value="">Choose your role</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="telecaller">Telecaller</option>
                            <option value="advisor">Advisor</option>
                            <option value="accountant">Accountant</option>
                        </select>
                    </div>
                    {otpSent && (
                        <div className="mb-3">
                            <label htmlFor="otp" className="form-label">Enter OTP</label>
                            <input 
                                type="text" 
                                placeholder='Enter OTP sent to your email' 
                                className="form-control" 
                                onChange={(e) => setOtp(e.target.value)} 
                                required 
                            />
                        </div>
                    )}
                    {error && <p className="text-danger text-center">{error}</p>}
                    <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#373b44', border: 'none' }}>
                        {otpSent ? "Register" : "Send OTP"}
                    </button>
                </form>
                <p className="mt-3 text-center">
                    Already have an account? <Link to="/login" className="text-primary">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
