import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';

function Reminder() {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchReminders();
    requestNotificationPermission();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/reminders');
      const data = await response.json();
      setReminders(data);
      
      // Store reminders in local storage for offline use
      localStorage.setItem('reminders', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching reminders:', error);
      
      // If there was an error, fetch from local storage as a fallback
      const localReminders = JSON.parse(localStorage.getItem('reminders')) || [];
      setReminders(localReminders);
    }
  };

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      toast.warn('Notifications are not enabled. Please allow them for reminders.');
    }
  };

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // HH:MM
      const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD

      reminders.forEach((reminder) => {
        if (reminder.date === currentDate && reminder.time === currentTime) {
          triggerNotification(reminder);
        }
      });
    };

    const interval = setInterval(checkReminders, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [reminders]);

  const triggerNotification = (reminder) => {
    const repeatCount = 5;
    const interval = 2000; // Interval of 2 seconds between each notification

    for (let i = 0; i < repeatCount; i++) {
      setTimeout(() => {
        // Display Toast Notification
        toast.info(`Reminder: ${reminder.title}`, {
          position: 'top-right', // Correctly use string instead of toast.POSITION.TOP_RIGHT
          autoClose: 10000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Trigger browser notification if permission is granted
        if (Notification.permission === 'granted') {
          new Notification(`Reminder: ${reminder.title}`, {
            body: `Reminder for: ${reminder.title} at ${reminder.time}`,
          });
        }
      }, i * interval); // Delay each notification by 2 seconds
    }
  };

  const addReminder = async () => {
    if (!title || !date || !time || !description) {
      return alert('Please fill all fields.');
    }

    const newReminder = { title, date, time , description };

    try {
      if (editIndex !== null) {
        const response = await fetch(`http://localhost:3001/api/reminders/${reminders[editIndex]._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReminder),
        });
        const updatedReminder = await response.json();
        const updatedReminders = [...reminders];
        updatedReminders[editIndex] = updatedReminder;
        setReminders(updatedReminders);
        setEditIndex(null);
      } else {
        const response = await fetch('http://localhost:3001/api/reminders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReminder),
        });
        const savedReminder = await response.json();
        setReminders([...reminders, savedReminder]);
      }
      setTitle('');
      setDate('');
      setTime('');
      setDescription('');
    } catch (error) {
      console.error('Error saving reminder:', error);
    }
  };

  const editReminder = (index) => {
    setTitle(reminders[index].title);
    setDate(reminders[index].date);
    setTime(reminders[index].time);
    setDescription(reminders[index].description);
    setEditIndex(index);
  };

  const deleteReminder = async (index) => {
    try {
      await fetch(`http://localhost:3001/api/reminders/${reminders[index]._id}`, {
        method: 'DELETE',
      });
      setReminders(reminders.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  return (
    <Container fluid className="mt-5">
      <ToastContainer />
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="p-4 animate__animated animate__fadeInDown">
            <Card.Body>
              <h4 className="text-center mb-4">Set a New Reminder</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Reminder Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter reminder title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  type="Enter description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                />
              </Form.Group>
                <Button variant="primary" className="w-100" onClick={addReminder}>
                  {editIndex !== null ? 'Update Reminder' : 'Add Reminder'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <Card className="p-4 mt-5 animate__animated animate__fadeInUp">
            <Card.Body>
              <h4 className="text-center mb-4">Upcoming Reminders</h4>
              <ListGroup>
                {reminders.length > 0 ? (
                  reminders.map((reminder, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{reminder.title}</strong> - {reminder.date} at {reminder.time}
                        <div>
                          <strong>{reminder.description}</strong>

                        </div>
                      </div>
                      <div>
                        <Button variant="outline-info" size="sm" className="me-2" onClick={() => editReminder(index)}>
                          Edit
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => deleteReminder(index)}>
                          Delete
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No reminders set</ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Reminder;
