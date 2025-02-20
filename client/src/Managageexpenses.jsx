import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'animate.css'; // Import animate.css for animations
import NavBar from './NavBar';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ManageExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    date: '',
    callDetails: '',
    paymentAmount: '',
    paymentStatus: '',
    customerResponse: '',
    projectName: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openProject, setOpenProject] = useState(null); // Track open project

  // Fetch expenses and projects from the server
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/projects/all');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchExpenses();
    fetchProjects();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for adding/updating expenses
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        const response = await axios.put(`http://localhost:3001/api/expenses/${currentId}`, formData);
        setExpenses(expenses.map(expense => (expense._id === currentId ? response.data : expense)));
      } else {
        const response = await axios.post('http://localhost:3001/api/expenses', formData);
        setExpenses([...expenses, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  // Populate form fields for editing
  const handleEdit = (expense) => {
    setFormData({
      customerName: expense.customerName,
      date: new Date(expense.date).toISOString().split('T')[0],
      callDetails: expense.callDetails,
      paymentAmount: expense.paymentAmount,
      paymentStatus: expense.paymentStatus,
      customerResponse: expense.customerResponse,
      projectName: expense.projectName
    });
    setIsEditing(true);
    setCurrentId(expense._id);
  };

  // Handle expense deletion
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/expenses/${id}`);
      if (response.status === 200) {
        setExpenses(expenses.filter(expense => expense._id !== id));
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({
      customerName: '',
      date: '',
      callDetails: '',
      paymentAmount: '',
      paymentStatus: '',
      customerResponse: '',
      projectName: ''
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  // Search functionality
  const filteredExpenses = expenses.filter((expense) => {
    return (
      expense.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Group expenses by project
  const groupedExpenses = filteredExpenses.reduce((acc, expense) => {
    const projectKey = expense.projectName || 'Unassigned';
    if (!acc[projectKey]) {
      acc[projectKey] = [];
    }
    acc[projectKey].push(expense);
    return acc;
  }, {});

  // Toggle project section
  const toggleProject = (projectName) => {
    setOpenProject(openProject === projectName ? null : projectName);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation Bar */}
      <NavBar title="Manage Expenses" />
      
      <div className="container mt-5">
        {/* Search Input */}
        <div className="form-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by customer name or project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Expense Form */}
        <form onSubmit={handleSubmit} className="mb-4 p-4 shadow rounded bg-light">
          <h4 className="mb-4 text-primary">{isEditing ? 'Edit Expense' : 'Add Expense'}</h4>
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              name="customerName"
              className="form-control"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Call Details</label>
            <input
              type="text"
              name="callDetails"
              className="form-control"
              value={formData.callDetails}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Payment Amount</label>
            <input
              type="number"
              name="paymentAmount"
              className="form-control"
              value={formData.paymentAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Payment Status</label>
            <select
              name="paymentStatus"
              className="form-control"
              value={formData.paymentStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          <div className="form-group">
            <label>Customer Response</label>
            <input
              type="text"
              name="customerResponse"
              className="form-control"
              value={formData.customerResponse}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Project Name</label>
            <select
              name="projectName"
              className="form-control"
              value={formData.projectName}
              onChange={handleChange}
              required
            >
              <option value="">Select Project</option>
              {projects.map(project => (
                <option key={project._id} value={project.name}>{project.name}</option>
              ))}
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary mt-3">
            {isEditing ? 'Update Expense' : 'Add Expense'}
          </button>
          
          {isEditing && (
            <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>

        {/* Expense List */}
        <h4 className="mb-4 text-info">Expense List</h4>
        {Object.keys(groupedExpenses).map(projectName => (
          <div key={projectName} className="card mb-4 shadow animate__animated animate__fadeIn">
            <div className="card-header bg-primary text-white" onClick={() => toggleProject(projectName)} style={{ cursor: 'pointer' }}>
              <h5 className="mb-0">{projectName} <i className={`fas ${openProject === projectName ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i></h5>
            </div>
            {openProject === projectName && (
              <div className="card-body">
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Customer Name</th>
                      <th>Date</th>
                      <th>Call Details</th>
                      <th>Payment Amount</th>
                      <th>Payment Status</th>
                      <th>Customer Response</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedExpenses[projectName].map(expense => (
                      <tr key={expense._id}>
                        <td>{expense.customerName}</td>
                        <td>{new Date(expense.date).toLocaleDateString()}</td>
                        <td>{expense.callDetails}</td>
                        <td>{expense.paymentAmount}</td>
                        <td>{expense.paymentStatus}</td>
                        <td>{expense.customerResponse}</td>
                        <td>
                          <button className="btn btn-warning btn-sm" onClick={() => handleEdit(expense)}>Edit</button>
                          <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(expense._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageExpenses;
