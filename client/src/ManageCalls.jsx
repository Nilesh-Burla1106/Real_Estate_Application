import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import NavBar from './NavBar';
import '@fortawesome/fontawesome-free/css/all.min.css';

function ManageCalls() {
  const [calls, setCalls] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    date: '',
    time: '',
    duration: '',
    outcome: '',
    notes: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch calls from API on component load
  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/calls');
        setCalls(response.data);
      } catch (error) {
        console.error('Error fetching calls:', error);
      }
    };
    fetchCalls();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number format
    if (!/^\d+$/.test(formData.phoneNumber)) {
      alert('Phone number must be a valid numeric value');
      return;
    }

    try {
      if (editingId) {
        const response = await axios.put(`http://localhost:3001/api/calls/${editingId}`, formData);
        setCalls(calls.map((call) => (call._id === editingId ? response.data : call)));
      } else {
        const response = await axios.post('http://localhost:3001/api/calls', formData);
        setCalls([...calls, response.data]);
      }
      resetForm();
      setEditingId(null);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      phoneNumber: '',
      date: '',
      time: '',
      duration: '',
      outcome: '',
      notes: '',
    });
  };

  const handleEdit = (call) => {
    setEditingId(call._id);
    setFormData({
      customerName: call.customerName,
      phoneNumber: call.phoneNumber,
      date: call.date,
      time: call.time,
      duration: call.duration,
      outcome: call.outcome,
      notes: call.notes,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this call record?')) {
      try {
        await axios.delete(`http://localhost:3001/api/calls/${id}`);
        setCalls(calls.filter((call) => call._id !== id));
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const handleCall = async (callDetails) => {
    try {
      console.log('Making call to:', callDetails.phoneNumber);
      const response = await axios.post('http://localhost:3001/api/calls', callDetails);
      console.log('Call saved successfully:', response.data);
    } catch (error) {
      console.error('Error making request:', error.message);
    }
  };

  const filteredCalls = calls.filter((call) =>
    call.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar title="Manage Calls" />
      <Container fluid className="animate__animated animate__fadeIn">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by customer name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Col>
          <Col md={2}>
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
                  <Form.Group controlId="formCustomerName">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter customer name"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button
                    variant="success"
                    onClick={() => handleCall(formData)}
                    disabled={!formData.phoneNumber}
                  >
                    <FontAwesomeIcon icon={faPhoneAlt} /> Call
                  </Button>
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
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formDuration">
                    <Form.Label>Duration (mins)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Call duration in minutes"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="formOutcome">
                    <Form.Label>Outcome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Outcome of the call"
                      name="outcome"
                      value={formData.outcome}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={8}>
                  <Form.Group controlId="formNotes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Additional notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit">
                {editingId ? 'Update Call Record' : 'Add Call Record'}
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Phone Number</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Duration (mins)</th>
                  <th>Outcome</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCalls.map((call) => (
                  <tr key={call._id}>
                    <td>{call.customerName}</td>
                    <td>{call.phoneNumber}</td>
                    <td>{call.date}</td>
                    <td>{call.time}</td>
                    <td>{call.duration}</td>
                    <td>{call.outcome}</td>
                    <td>{call.notes}</td>
                    <td>
                      <Button variant="info" onClick={() => handleEdit(call)} className="mr-2">
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(call._id)} className="mr-2">
                        Delete
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => handleCall(call)}
                        disabled={!call.phoneNumber}
                      >
                        <FontAwesomeIcon icon={faPhoneAlt} /> Call
                      </Button>
                    </td>
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

export default ManageCalls;
