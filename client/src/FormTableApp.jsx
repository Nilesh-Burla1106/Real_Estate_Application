import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlusCircle, FaEdit, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';

const FormTableApp = () => {
  const [formData, setFormData] = useState({
    serialNumber: '',
    lengthWidth: '',
    areaSqm: '',
    areaSqft: '',
    ownerName: '',
    bookingDate: ''
  });

  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch existing data on load
  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    const response = await axios.get('http://localhost:3001/api/plots');
    setTableData(response.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update plot details
      await axios.put(`http://localhost:3001/api/plots/${editId}`, formData);
      setIsEditing(false);
      setEditId(null);
    } else {
      // Add new plot
      await axios.post('http://localhost:3001/api/plots', formData);
    }

    setFormData({
      serialNumber: '',
      lengthWidth: '',
      areaSqm: '',
      areaSqft: '',
      ownerName: '',
      bookingDate: ''
    });
    fetchTableData(); // Refresh table after submission
  };

  const handleEdit = (id) => {
    const selectedPlot = tableData.find((item) => item._id === id);
    setFormData({
      serialNumber: selectedPlot.serialNumber,
      lengthWidth: selectedPlot.lengthWidth,
      areaSqm: selectedPlot.areaSqm,
      areaSqft: selectedPlot.areaSqft,
      ownerName: selectedPlot.ownerName,
      bookingDate: selectedPlot.bookingDate
    });
    setIsEditing(true);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/api/plots/${id}`);
    fetchTableData(); // Refresh table after deletion
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 animate__animated animate__fadeInDown">
        {isEditing ? 'Update Plot Details' : 'Add Plot Details'}
      </h2>

      {/* Form Card */}
      <div className="card shadow-lg p-4 mb-5 animate__animated animate__fadeInLeft rounded">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-4">
              <input
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                placeholder="Serial Number"
                className="form-control form-control-lg border-primary rounded-pill"
              />
            </div>
            <div className="form-group col-md-4">
              <input
                name="lengthWidth"
                value={formData.lengthWidth}
                onChange={handleChange}
                placeholder="Length and Width"
                className="form-control form-control-lg border-primary rounded-pill"
              />
            </div>
            <div className="form-group col-md-4">
              <input
                name="areaSqm"
                value={formData.areaSqm}
                onChange={handleChange}
                placeholder="Area in Sqm"
                className="form-control form-control-lg border-primary rounded-pill"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <input
                name="areaSqft"
                value={formData.areaSqft}
                onChange={handleChange}
                placeholder="Area in Sqft"
                className="form-control form-control-lg border-primary rounded-pill"
              />
            </div>
            <div className="form-group col-md-4">
              <input
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Owner Name"
                className="form-control form-control-lg border-primary rounded-pill"
              />
            </div>
            <div className="form-group col-md-4">
              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                className="form-control form-control-lg border-primary rounded-pill"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block mt-3 rounded-pill"
          >
            {isEditing ? 'Update Plot' : <><FaPlusCircle className="mr-2" /> Add Plot</>}
          </button>
        </form>
      </div>

      {/* Table Card */}
      <h2 className="text-center mt-5 mb-4 animate__animated animate__fadeInUp">Plot Details Table</h2>
      <div className="card shadow-lg p-4 animate__animated animate__zoomIn rounded">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered rounded">
            <thead className="thead-light">
              <tr>
                <th>Serial Number</th>
                <th>Length and Width</th>
                <th>Area Sqm</th>
                <th>Area Sqft</th>
                <th>Owner Name</th>
                <th>Booking Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item._id}>
                  <td>{item.serialNumber}</td>
                  <td>{item.lengthWidth}</td>
                  <td>{item.areaSqm}</td>
                  <td>{item.areaSqft}</td>
                  <td>{item.ownerName}</td>
                  <td>{new Date(item.bookingDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="btn btn-warning btn-sm mr-2 rounded-pill"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-danger btn-sm rounded-pill"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormTableApp;
