import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import DailyExpensesChart from './DailyExpensesChart';
import MonthlyExpensesChart from './MonthlyExpensesChart';
import CallActivityChart from './CallActivityChart';
import SiteVisitsBarChart from './SiteVisitsBarChart';
import NavBar from './NavBar';
import Footer from './Footer';
import ProjectExpensesChart from './ProjectExpensesChart'; 
import 'animate.css';

function ViewReports() {
  const [siteVisits, setSiteVisits] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    fetchSiteVisits();
    fetchExpenses();
    fetchProjects();
  }, []);

  const fetchSiteVisits = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/site-visits');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setSiteVisits(data);
    } catch (error) {
      console.error("Error fetching site visits:", error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/expenses');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/projects/all');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const containerStyle = {
    paddingTop: '20px',
    paddingBottom: '20px',
    background: 'linear-gradient(135deg, #f0f3f5 0%, #ffffff 100%)',
  };

  const cardStyle = {
    borderRadius: '15px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  };

  const cardHoverStyle = {
    transform: 'scale(1.03)',
    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
  };

  const titleStyle = {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05rem',
  };

  const selectStyle = {
    borderRadius: '12px',
    padding: '10px',
    fontSize: '1rem',
    borderColor: '#ced4da',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    transition: 'border-color 0.2s ease-in-out',
  };

  return (
    <Container fluid style={containerStyle}>
      <div className="d-flex flex-column min-vh-100">
        <NavBar title="Expense and Call Activity Reports" />

        {/* Daily Expenses Chart */}
        <Row className="mb-4">
          <Col md={12}>
            <Card
              className="animate__animated animate__fadeInLeft"
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = cardHoverStyle.transform;
                e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Card.Body>
                <h4 className="mb-4 text-center" style={titleStyle}>Daily Expenses Report</h4>
                <DailyExpensesChart />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Monthly Expenses Chart */}
        <Row className="mb-4">
          <Col md={12}>
            <Card
              className="animate__animated animate__fadeInRight"
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = cardHoverStyle.transform;
                e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Card.Body>
                <h4 className="mb-4 text-center" style={titleStyle}>Monthly Expenses Report</h4>
                <MonthlyExpensesChart />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call Activity Report */}
        <Row className="mb-4">
          <Col md={12}>
            <Card
              className="animate__animated animate__fadeInUp"
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = cardHoverStyle.transform;
                e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Card.Body>
                <h4 className="mb-4 text-center" style={titleStyle}>Call Activity Report</h4>
                <CallActivityChart />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Site Visits Activity Report */}
        <Row className="mb-4">
          <Col md={12}>
            <Card
              className="animate__animated animate__fadeInUpBig"
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = cardHoverStyle.transform;
                e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Card.Body>
                <h4 className="mb-4 text-center" style={titleStyle}>Site Visits Report</h4>
                <SiteVisitsBarChart data={siteVisits} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Select Project */}
        <Row className="mb-4">
          <Col md={12}>
            <div className="form-group">
              <label htmlFor="projectSelect">Select Project:</label>
              <select 
                id="projectSelect" 
                className="form-control" 
                value={selectedProject} 
                onChange={(e) => setSelectedProject(e.target.value)}
                style={selectStyle}
              >
                <option value="">All Projects</option>
                {projects.map(project => (
                  <option key={project._id} value={project.name}>{project.name}</option>
                ))}
              </select>
            </div>
          </Col>
        </Row>

        {/* Project Expenses Report */}
        {selectedProject && (
          <Row className="mb-4">
            <Col md={12}>
              <Card
                className="animate__animated animate__fadeInRight"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = cardHoverStyle.transform;
                  e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Card.Body>
                  <h4 className="mb-4 text-center" style={titleStyle}>
                    Project Expenses for {selectedProject}
                  </h4>
                  <ProjectExpensesChart selectedProject={selectedProject} expenses={expenses} />
                  
                  <ul className="list-group mt-4">
                    {expenses
                      .filter(exp => exp.projectName === selectedProject)
                      .map(exp => (
                        <li 
                          key={exp._id} 
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <span>{`${exp.customerName} - ${exp.paymentAmount} - ${new Date(exp.date).toLocaleDateString()}`}</span>
                          <span className={`badge badge-${exp.paymentStatus === 'Pending' ? 'danger' : 'success'}`}>
                            {exp.paymentStatus}
                          </span>
                        </li>
                      ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        <Footer />
      </div>
    </Container>
  );
}

export default ViewReports;
