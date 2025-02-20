import React, { useState } from 'react';

function ManageListings() {
    const [listings, setListings] = useState([]);
    const [newListing, setNewListing] = useState({ title: '', address: '', price: '' });

    // Handle form input changes
    const handleChange = (e) => {
        setNewListing({
            ...newListing,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setListings([...listings, newListing]);
        setNewListing({ title: '', address: '', price: '' });
    };

    // Handle delete listing
    const handleDelete = (index) => {
        setListings(listings.filter((_, i) => i !== index));
    };

    return (
        <div className="container mt-5">
            <h2>Manage Listings</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        placeholder="Property Title"
                        value={newListing.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mt-2">
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Property Address"
                        value={newListing.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mt-2">
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        placeholder="Price"
                        value={newListing.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Add Listing</button>
            </form>

            <h3>Current Listings</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Address</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listings.map((listing, index) => (
                        <tr key={index}>
                            <td>{listing.title}</td>
                            <td>{listing.address}</td>
                            <td>{listing.price}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageListings;
