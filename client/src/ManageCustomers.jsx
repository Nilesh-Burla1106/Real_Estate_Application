import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import NavBar from './NavBar';
import '@fortawesome/fontawesome-free/css/all.min.css';

function ManageCustomers() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('All'); // New state for lead status filter
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    callsMade: 0,
    place: '',
    project: '',
    leadStatus: 'new',
    oldLeadResponses: '',
    description: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/customers');
        setCustomers(response.data);
        setFilteredCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setError('Error fetching customer data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/projects/all');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Error fetching project data. Please try again later.');
      }
    };

    fetchCustomers();
    fetchProjects();
  }, []);

  useEffect(() => {
    const results = customers.filter(customer => {
      const matchesSearch = customer.name && customer.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = leadStatusFilter === 'All' || customer.leadStatus === leadStatusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
    setFilteredCustomers(results);
  }, [searchTerm, leadStatusFilter, customers]);

  const getProjectName = (projectId) => {
    const project = projects.find(proj => proj._id === projectId);
    return project ? project.name : 'N/A';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLeadStatusFilterChange = (e) => {
    setLeadStatusFilter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const response = await axios.put(`http://localhost:3001/api/customers/${currentCustomerId}`, formData);
        const updatedCustomers = customers.map(customer =>
          customer._id === currentCustomerId ? response.data : customer
        );
        setCustomers(updatedCustomers);
        setFilteredCustomers(updatedCustomers);
      } else {
        const response = await axios.post('http://localhost:3001/api/customers', formData);
        setCustomers([...customers, response.data]);
        setFilteredCustomers([...customers, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving customer data:', error.response ? error.response.data : error.message);
      setError('Error saving customer data. Please try again later.');
    }
  };

  const handleCall = (phoneNumber) => {
    alert(`Initiating call to ${phoneNumber}`);
  };

  const handleEdit = (customer) => {
    setFormData(customer);
    setEditing(true);
    setCurrentCustomerId(customer._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axios.delete(`http://localhost:3001/api/customers/${id}`);
        const updatedCustomers = customers.filter(customer => customer._id !== id);
        setCustomers(updatedCustomers);
        setFilteredCustomers(updatedCustomers);
      } catch (error) {
        console.error('Error deleting customer:', error);
        setError('Error deleting customer data. Please try again later.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      callsMade: 0,
      place: '',
      project: '',
      leadStatus: 'new',
      oldLeadResponses: '',
      description: '',
    });
    setEditing(false);
    setCurrentCustomerId(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar title="Manage Customers" />
      <Container fluid>
        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div>Loading customers...</div>
        ) : (
          <>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Search by customer name or email"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Col>
              <Col md={3}>
                <Form.Select value={leadStatusFilter} onChange={handleLeadStatusFilterChange}>
                  <option value="All">All Leads</option>
                  <option value="new">New Leads</option>
                  <option value="old">Old Leads</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Button variant="primary" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </Col>
            </Row>

            <Card className="mb-4">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter customer name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter phone number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Group controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="formTime">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="formCallsMade">
                        <Form.Label>Calls Made</Form.Label>
                        <Form.Control
                          type="number"
                          name="callsMade"
                          value={formData.callsMade}
                          onChange={handleInputChange}
                          min="0"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Group controlId="formPlace">
                        <Form.Label>Place</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter place"
                          name="place"
                          value={formData.place}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="formProject">
                        <Form.Label>Project</Form.Label>
                        <Form.Control
                          as="select"
                          name="project"
                          value={formData.project}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select a project</option>
                          {projects.map(project => (
                            <option key={project._id} value={project._id}>
                              {project.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="formLeadStatus">
                        <Form.Label>Lead Status</Form.Label>
                        <Form.Control
                          as="select"
                          name="leadStatus"
                          value={formData.leadStatus}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="new">New</option>
                          <option value="old">Old</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formOldLeadResponses">
                        <Form.Label>Old Lead Responses</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter old lead responses"
                          name="oldLeadResponses"
                          value={formData.oldLeadResponses}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit">
                    {editing ? 'Update Customer' : 'Add Customer'}
                  </Button>
                </Form>
              </Card.Body>
              {/* Form for adding/editing customers */}
            </Card>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Calls Made</th>
                  <th>Place</th>
                  <th>Project</th>
                  <th>Lead Status</th>
                  <th>Old Lead Responses</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map(customer => {
                  const projectName = getProjectName(customer.project);
                  return (
                    <tr key={customer._id}>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>
                        <Button variant="link" onClick={() => handleCall(customer.phone)}>
                          <FontAwesomeIcon icon={faPhoneAlt} />
                        </Button>
                        {customer.phone}
                      </td>
                      <td>{new Date(customer.date).toLocaleDateString()}</td>
                      <td>{customer.time}</td>
                      <td>{customer.callsMade}</td>
                      <td>{customer.place}</td>
                      <td>{projectName}</td>
                      <td>{customer.leadStatus}</td>
                      <td>{customer.oldLeadResponses}</td>
                      <td>{customer.description}</td>
                      <td>
                        <Button variant="warning" onClick={() => handleEdit(customer)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button variant="danger" className="ml-2" onClick={() => handleDelete(customer._id)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </div>
  );
}
export default ManageCustomers;
