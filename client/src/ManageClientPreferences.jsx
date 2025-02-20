import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import 'animate.css';  // Import animate.css for animations
import NavBar from './NavBar';
import '@fortawesome/fontawesome-free/css/all.min.css';

function ManageClientPreferences() {
    const [clientPreferences, setClientPreferences] = useState([]);
    const [newPreference, setNewPreference] = useState({ client: "", budget: "", propertyType: "", location: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        // Fetching client preferences on component mount
        axios.get('http://localhost:3001/api/client-preferences')
            .then(response => setClientPreferences(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPreference((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addClientPreference = () => {
        if (!newPreference.client || !newPreference.budget || !newPreference.propertyType || !newPreference.location) {
            alert('Please fill out all required fields.');
            return;
        }
    
        if (isEditing) {
            axios.put(`http://localhost:3001/api/client-preferences/${editId}`, newPreference)
                .then(response => {
                    setClientPreferences(clientPreferences.map((pref) => (pref.id === editId ? response.data : pref)));
                    setIsEditing(false);
                })
                .catch(error => console.error('Error updating data:', error));
        } else {
            axios.post('http://localhost:3001/api/client-preferences', newPreference)
                .then(response => {
                    setClientPreferences([...clientPreferences, response.data]);
                })
                .catch(error => console.error('Error adding data:', error));
        }
        setNewPreference({ client: "", budget: "", propertyType: "", location: "" });
    };
    const editClientPreference = (preference) => {
        setIsEditing(true);
        setNewPreference(preference);
        setEditId(preference._id);
    };

    const deleteClientPreference = (id) => {
        axios.delete(`http://localhost:3001/api/client-preferences/${id}`)
            .then(() => {
                setClientPreferences(clientPreferences.filter((pref) => pref._id !== id));
            })
            .catch(error => console.error('Error deleting data:', error));
    };

    return (
        <div className="d-flex flex-column min-vh-100">
    {/* Navigation Bar */}
    <NavBar title="Manage Client Preferences" />
        <div className="container">
            
            <table className="table table-bordered table-hover table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Client</th>
                        <th>Budget</th>
                        <th>Property Type</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clientPreferences.map((pref) => (
                        <tr key={pref._id}>
                            <td>{pref.client}</td>
                            <td>{pref.budget}</td>
                            <td>{pref.propertyType}</td>
                            <td>{pref.location}</td>
                            <td>
                                <button className="btn btn-warning btn-sm mx-1" onClick={() => editClientPreference(pref)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger btn-sm mx-1" onClick={() => deleteClientPreference(pref._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="my-4">
                <h4>{isEditing ? "Edit Client Preference" : "Add New Client Preference"}</h4>
                <div className="form-group">
                    <label>Client</label>
                    <input
                        type="text"
                        className="form-control"
                        name="client"
                        value={newPreference.client}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Budget</label>
                    <input
                        type="text"
                        className="form-control"
                        name="budget"
                        value={newPreference.budget}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Property Type</label>
                    <input
                        type="text"
                        className="form-control"
                        name="propertyType"
                        value={newPreference.propertyType}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={newPreference.location}
                        onChange={handleInputChange}
                    />
                </div>
                <button className="btn btn-primary mt-3" onClick={addClientPreference}>
                    {isEditing ? "Update Client Preference" : "Add Client Preference"}
                </button>
            </div>
        </div>
       
      </div>
    );
}

export default ManageClientPreferences;
