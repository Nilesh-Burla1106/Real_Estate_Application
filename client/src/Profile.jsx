import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import NavBar from './NavBar';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Profile() {
    const [user, setUser] = useState({
        email: "",
        role: "",
        name: "",
        mobile: "",
        facebook: "",
        linkedin: "",
        twitter: ""
    });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        } else {
            window.location.href = "/";
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        localStorage.setItem("user", JSON.stringify(user));
        setEditMode(false);
    };

    if (!user) {
        return <div className="container mt-5"><p>Loading...</p></div>;
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navigation Bar */}
            <NavBar title="Profile" />
            
            <div className="profile-page">
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className={`card profile-card shadow-lg animate__animated animate__fadeIn`}>
                                <div className="card-body">
                                    <h4 className="card-title text-center mb-4">Profile Card</h4>
                                    <div className="profile-content">

                                        {/* Display Name */}
                                        {editMode ? (
                                            <div className="form-group">
                                                <label className="font-weight-bold">Name:</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={user.name}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Enter your name"
                                                />
                                            </div>
                                        ) : (
                                            <p className="text-muted"><strong>Name:</strong> {user.name || "Not provided"}</p>
                                        )}

                                        {/* Display Email */}
                                        <p className="text-muted"><strong>Email:</strong> {user.email}</p>

                                        {/* Display Role */}
                                        <p className="text-muted"><strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>

                                        {/* Display Mobile Number */}
                                        {editMode ? (
                                            <div className="form-group">
                                                <label className="font-weight-bold">Mobile Number:</label>
                                                <input
                                                    type="text"
                                                    name="mobile"
                                                    value={user.mobile}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Enter your mobile number"
                                                />
                                            </div>
                                        ) : (
                                            <p className="text-muted"><strong>Mobile:</strong> {user.mobile || "Not provided"}</p>
                                        )}

                                        {/* Display Social Media Links */}
                                        {editMode ? (
                                            <>
                                                <div className="form-group">
                                                    <label className="font-weight-bold">Facebook:</label>
                                                    <input
                                                        type="text"
                                                        name="facebook"
                                                        value={user.facebook}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        placeholder="Enter your Facebook profile link"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="font-weight-bold">LinkedIn:</label>
                                                    <input
                                                        type="text"
                                                        name="linkedin"
                                                        value={user.linkedin}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        placeholder="Enter your LinkedIn profile link"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="font-weight-bold">Twitter:</label>
                                                    <input
                                                        type="text"
                                                        name="twitter"
                                                        value={user.twitter}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        placeholder="Enter your Twitter profile link"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-muted"><strong>Facebook:</strong> {user.facebook || "Not provided"}</p>
                                                <p className="text-muted"><strong>LinkedIn:</strong> {user.linkedin || "Not provided"}</p>
                                                <p className="text-muted"><strong>Twitter:</strong> {user.twitter || "Not provided"}</p>
                                            </>
                                        )}

                                        {/* Edit/Save Button */}
                                        {editMode ? (
                                            <button 
                                                className="btn btn-success mt-3 animate__animated animate__pulse"
                                                onClick={handleSave}
                                            >
                                                Save Changes
                                            </button>
                                        ) : (
                                            <button 
                                                className="btn btn-primary mt-3 animate__animated animate__pulse"
                                                onClick={() => setEditMode(true)}
                                            >
                                                Edit Profile
                                            </button>
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
