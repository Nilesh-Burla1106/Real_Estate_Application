import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Form, Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import 'animate.css';
import NavBar from './NavBar';
import '@fortawesome/fontawesome-free/css/all.min.css';

function ViewUsers() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/customers');
        setCustomers(response.data);
        setFilteredCustomers(response.data);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const results = customers
      .filter(customer => 
        customer.name && customer.email && customer.phone // Filter out customers with missing fields
      )
      .filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      );
    setFilteredCustomers(results);
  }, [searchTerm, customers]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation Bar */}
      <NavBar title="Customer List" />
      <Container fluid className="mt-4">

        {/* Search Bar */}
        <Row className="mb-3 justify-content-center">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by name, email, or phone"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Col>
        </Row>

        <Card className="animate__animated animate__fadeIn">
          <Card.Body>
            <Table striped bordered hover responsive className="table-sm">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Calls Made</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr key={customer._id} className="animate__animated animate__fadeInUp">
                    <td>{index + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.date ? new Date(customer.date).toLocaleDateString() : ''}</td>
                    <td>{customer.callsMade}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ViewUsers;
