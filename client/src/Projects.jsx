import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'animate.css/animate.min.css'; // Import Animate.css
import NavBar from './NavBar';
import Chart from 'react-apexcharts';

const Project = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [projects, setProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [projectDetails, setProjectDetails] = useState(null);
  const [customerData, setCustomerData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch all projects (ongoing and completed)
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/projects/all');
      const ongoing = response.data.filter(project => project.status === 'ongoing');
      const completed = response.data.filter(project => project.status === 'completed');
      setProjects(ongoing);
      setCompletedProjects(completed);
    } catch (error) {
      setError('Error fetching projects');
    }
  };

  // Handle adding a new project
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');
    try {
      await axios.post('http://localhost:3001/api/projects/add', { name, description, details });
      setSuccess(true);
      setLoading(false);
      setName('');
      setDescription('');
      setDetails('');
      fetchProjects();  // Refetch projects after successful addition
    } catch (err) {
      setError('Error adding project');
      setLoading(false);
    }
  };

  // Handle marking project status as completed or ongoing
  const handleStatusChange = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/projects/update-status/${id}`);
      fetchProjects();  // Refetch projects after updating status
    } catch (err) {
      setError('Error updating project status');
    }
  };

  // Fetch project details along with customers and expenses related to the project
  const fetchProjectDetails = async (id) => {
    try {
      // Fetch the project details by ID
      const projectResponse = await axios.get(`http://localhost:3001/api/projects/${id}`);
      setProjectDetails(projectResponse.data);

      // Fetch related expenses for the specific project
      const expenseResponse = await axios.get('http://localhost:3001/api/expenses');
      const relatedExpenses = expenseResponse.data.filter(expense => expense.projectName === projectResponse.data.name);
      
      // Map expenses to customers
      const customerMap = {};
      relatedExpenses.forEach(expense => {
        if (!customerMap[expense.customerName]) {
          customerMap[expense.customerName] = {
            contact: expense.customerContact,
            expenses: []
          };
        }
        customerMap[expense.customerName].expenses.push({
          amount: expense.amount,
          status: expense.paymentStatus // Adjust the property name based on your API response
        });
      });

      // Convert the customer map to an array
      const relatedCustomers = Object.entries(customerMap).map(([name, { contact, expenses }]) => ({
        name,
        contact,
        expenses
      }));

      setCustomerData(relatedCustomers);
      setExpenseData(relatedExpenses); // This may not be needed anymore if you're displaying expenses with customers
    } catch (err) {
      setError('Error fetching project details and related data');
    }
  };

  // Chart data for Ongoing vs Completed Projects
  const projectStatusChart = {
    series: [projects.length, completedProjects.length],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Ongoing Projects', 'Completed Projects'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <NavBar title="Projects Section" />
      <div className="container mt-5 animate__animated animate__fadeIn">
        <h2 className="text-center mb-4 font-bold text-primary">Add New Project</h2>
        
        <div className="row justify-content-between">
          {/* Left side - Project Form */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg p-4 rounded" style={{ background: '#f7f9fc' }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="projectName" className="text-muted">Project Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectName"
                    placeholder="Enter project name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="projectDescription" className="text-muted">Project Description</label>
                  <textarea
                    className="form-control"
                    id="projectDescription"
                    rows="3"
                    placeholder="Enter project description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="projectDetails" className="text-muted">Project Details</label>
                  <textarea
                    className="form-control"
                    id="projectDetails"
                    rows="3"
                    placeholder="Enter project details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Project'}
                </button>
                {success && (
                  <div className="alert alert-success mt-3">
                    Project added successfully!
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger mt-3">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right side - Donut Chart */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg p-4 rounded" style={{ background: '#f7f9fc' }}>
              <h4 className="text-center text-muted mb-4">Project Status Overview</h4>
              <Chart options={projectStatusChart.options} series={projectStatusChart.series} type="donut" height={310} />
            </div>
          </div>
        </div>

        {/* Ongoing Projects */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <h2 className="text-center mb-4 text-primary">Ongoing Projects</h2>
            <div className="list-group">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project._id} className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2">
                    <div>
                      <strong>{project.name}</strong>: {project.description}
                    </div>
                    <div>
                      <button className="btn btn-info btn-sm mr-2" onClick={() => fetchProjectDetails(project._id)}>
                        Details
                      </button>
                      <button className="btn btn-warning btn-sm" onClick={() => handleStatusChange(project._id)}>
                        Completed
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No ongoing projects.</p>
              )}
            </div>
          </div>
        </div>

        {/* Completed Projects */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <h2 className="text-center mb-4 text-success">Completed Projects</h2>
            <div className="list-group">
              {completedProjects.length > 0 ? (
                completedProjects.map((project) => (
                  <div key={project._id} className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2">
                    <div>
                      <strong>{project.name}</strong>: {project.description}
                    </div>
                    <div>
                      <button className="btn btn-info btn-sm mr-2" onClick={() => fetchProjectDetails(project._id)}>
                        View Details
                      </button>
                      <button className="btn btn-success btn-sm" onClick={() => handleStatusChange(project._id)}>
                        Mark as Ongoing
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No completed projects.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
