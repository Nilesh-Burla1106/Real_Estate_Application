import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
    const { token } = useParams();  // Extract the token from the URL
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/auth/reset-password', { token, password });
            setMessage(response.data.message);
            setError('');
            
            // Redirect to login page after successful reset
            navigate('/login');
        } catch (err) {
            setError('Failed to reset password. The token might be invalid or expired.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" 
        style={{ background: 'linear-gradient(135deg, #73c8a9, #373b44)', color: '#fff' }}>
            <div className="bg-white p-5 rounded shadow-lg w-50" style={{ maxWidth: '500px', borderRadius: '15px' }}>
                <h2 className="text-center mb-4" style={{ color: '#373b44' }}>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Enter new password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Confirm new password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    {message && <p className="text-success text-center">{message}</p>}
                    {error && <p className="text-danger text-center">{error}</p>}
                    <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#373b44', border: 'none' }}>
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
