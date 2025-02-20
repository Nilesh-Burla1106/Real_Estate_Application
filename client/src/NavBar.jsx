import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Offcanvas, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'animate.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function NavBar({ title }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = sessionStorage.getItem('userRole');
    setRole(userRole || '');
  }, []);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleNavigate = (page) => {
    navigate(page);
    setShowSidebar(false);
  };

  const SidebarCard = ({ iconClass, label, page }) => (
    <Card className="mb-3 shadow-sm border-0" onClick={() => handleNavigate(page)} 
          style={{ cursor: 'pointer', transition: 'transform 0.2s', borderRadius: '8px' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      <Card.Body className="d-flex align-items-center">
        <i className={`${iconClass} me-3 text-primary`} style={{ fontSize: '1.5em' }}></i>
        <h6 className="mb-0">{label}</h6>
      </Card.Body>
    </Card>
  );

  return (
    <>
      <Navbar expand="lg" fixed="top" className="shadow-lg" 
              style={{ background: 'linear-gradient(110deg, #6e7a88, #1e2530)', color: '#ffffff' }}>
        <Container fluid>
          <Button variant="outline-light" className="me-3" onClick={toggleSidebar}>
            <i className="fa-solid fa-bars"></i>
          </Button>
          <Navbar.Brand className="ms-3">
            <img
              src="logo1.png"
              alt="Logo"
              width="140"
              height="60"
              className="d-inline-block align-top animate__animated animate__bounce animate__delay-1s"
              style={{ animationDuration: '2s' }}
            />
          </Navbar.Brand>
          <Navbar.Brand className="mx-auto text-center" style={{ flex: 1 }}>
            <h1 className="text-white animate__animated animate__fadeInDown animate__delay-1s" 
                style={{ textShadow: '2px 2px 6px #000000', fontWeight: 'bold' }}>
              {title}
            </h1>
          </Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link onClick={() => handleNavigate('/profile')} className="me-3">
              <i className="fas fa-user-circle fa-lg text-info" title="Profile"></i>
            </Nav.Link>
            <Nav.Link onClick={() => handleNavigate('/settings')} className="me-3">
              <i className="fas fa-cog fa-lg text-warning" title="Settings"></i>
            </Nav.Link>
            <Nav.Link onClick={() => handleNavigate('/reminders')} className="me-3">
              <i className="fas fa-bell fa-lg text-success" title="Reminders"></i>
            </Nav.Link>
            <Nav.Link onClick={() => handleNavigate('/home')} className="me-2">
              <i className="fas fa-sign-out-alt fa-lg text-danger" title="Logout"></i>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Sidebar */}
      <Offcanvas show={showSidebar} onHide={toggleSidebar} style={{ width: '300px' }} 
                 className="animate__animated animate__slideInLeft" backdropClassName="bg-dark">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-primary">Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {role === 'admin' && (
              <>
                <h5 className="text-dark mb-3">Admin Panel</h5>
                <SidebarCard iconClass="fas fa-home" label="Home" page="/admin-dashboard" />
                <SidebarCard iconClass="fas fa-calendar-alt" label="Manage Site Visits" page="/schedule-site-visits" />
                <SidebarCard iconClass="fas fa-user-cog" label="Manage Client Preferences" page="/manage-client-preferences" />
                <SidebarCard iconClass="fas fa-phone" label="Manage Calls" page="/manage-calls" />
                <SidebarCard iconClass="fas fa-wallet" label="Manage Expenses" page="/manage-expenses" />
                <SidebarCard iconClass="fas fa-file-alt" label="View Reports" page="/view-reports" />
                <SidebarCard iconClass="fas fa-users" label="View Clients" page="/view-users" />
              </>
            )}
            {role === 'manager' && (
              <>
                <h5 className="text-dark mb-3">Manager Panel</h5>
                <SidebarCard iconClass="fas fa-home" label="Home" page="/manager-dashboard" />
                <SidebarCard iconClass="fas fa-user-cog" label="Manage Projects" page="/projects" />
                <SidebarCard iconClass="fas fa-file-alt" label="View Reports" page="/view-reports" />
                <SidebarCard iconClass="fas fa-wallet" label="Manage Expenses" page="/manage-expenses" />
                <SidebarCard iconClass="fas fa-users" label="Manage Customers" page="/manage-customers" />
              </>
            )}
            {role === 'telecaller' && (
              <>
                <h5 className="text-dark mb-3">Telecaller Panel</h5>
                <SidebarCard iconClass="fas fa-home" label="Home" page="/telecaller-dashboard" />
                <SidebarCard iconClass="fas fa-phone" label="Manage Calls" page="/manage-calls" />
                <SidebarCard iconClass="fas fa-users" label="Manage Customers" page="/manage-customers" />
                <SidebarCard iconClass="fas fa-desktop" label="Upload Excel-Files" page="/upload-page" />
              </>
            )}
            {role === 'advisor' && (
              <>
                <h5 className="text-dark mb-3">Advisor Panel</h5>
                <SidebarCard iconClass="fas fa-home" label="Home" page="/advisor-dashboard" />
                <SidebarCard iconClass="fas fa-calendar-check" label="Schedule Visits" page="/schedule-site-visits" />
                <SidebarCard iconClass="fas fa-cogs" label="Manage Calls" page="/manage-calls" />
              </>
            )}
            {role === 'accountant' && (
              <>
                <h5 className="text-dark mb-3">Accountant Panel</h5>
                <SidebarCard iconClass="fas fa-home" label="Home" page="/accountant-dashboard" />
                <SidebarCard iconClass="fas fa-wallet" label="Manage Expenses" page="/manage-expenses" />
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Add margin below the navbar to prevent content overlap */}
      <div style={{ marginTop: '80px' }}>
        {/* Main content will go here */}
      </div>
    </>
  );
}

export default NavBar;
