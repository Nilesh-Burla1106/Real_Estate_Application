import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import NavBar from './NavBar';
import Footer from './Footer';
import MonthlyExpensesChart from './MonthlyExpensesChart';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Row, Col, Card, Button } from 'react-bootstrap';

// Custom Inline Theme Styles
const customStyles = {
    card: {
        backgroundColor: '#ffffff',
        color: '#333',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        borderRadius: '15px',
        padding: '20px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#ffffff',
    },
    hover: {
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 25px rgba(0, 0, 0, 0.2)',
    },
    button: {
        borderRadius: '50px',
        padding: '10px 20px',
        background: 'linear-gradient(90deg, #4caf50, #2196f3)',
        color: '#fff',
        border: 'none',
    },
    chartColors: ['#4caf50', '#f44336', '#2196f3'],
    backgroundOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: -1,
    }
};

// Reusable Dashboard Card Component with Animation
const DashboardCard = ({ title, text, buttonText, onClick, iconClass, buttonColor }) => (
    <Col lg={4} md={6} className="mb-4 animate__animated animate__fadeInUp">
        <Card 
            className="shadow-lg p-4" 
            style={customStyles.card}
            onMouseEnter={(e) => e.currentTarget.style = customStyles.hover}
            onMouseLeave={(e) => e.currentTarget.style = customStyles.card}
        >
            <div className="d-flex flex-column align-items-start h-100">
                <h5 className="card-title mb-2 d-flex align-items-center">
                    <i className={`${iconClass} me-2`} style={{ color: buttonColor, fontSize: '1.4em' }}></i> 
                    {title}
                </h5>
                <p className="card-text">{text}</p>
                <Button
                    style={{ ...customStyles.button, backgroundColor: buttonColor }}
                    onClick={onClick}
                    className="w-100 mt-auto"
                >
                    {buttonText}
                </Button>
            </div>
        </Card>
    </Col>
);

function AdminDashboard() {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses(); 
    }, []);

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

    return (
        <div style={{ background: 'linear-gradient( #283048, #859398)', minHeight: '100vh' }}>
            <NavBar title="Admin Dashboard" role="admin" />
            <div className="container-fluid p-5 position-relative">
                {/* Background Image */}
                <div 
                    className="position-absolute w-100 h-100" 
                    style={{
                        ...customStyles.backgroundOverlay,
                        backgroundImage: 'url(/skylline2.jpg)',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                ></div>

                {/* Title Section */}
                <div className="text-center mb-5 animate__animated animate__fadeInDown">
                    <h1 className="display-5" style={{ color: '#00E396', fontFamily: 'Poppins, sans-serif' }}>
                        Efficiently Manage Site Visits, Calls, Projects and Finances
                    </h1>
                </div>

                {/* Dashboard Cards */}
                <Row className="mb-5">
                    <DashboardCard 
                        title="Manage Site Visits" 
                        text="Schedule and track client site visits" 
                        buttonText="Schedule Site Visits"
                        onClick={() => navigate('/schedule-site-visits')}
                        iconClass="fas fa-map-marker-alt"
                        buttonColor="#4caf50"
                    />
                    <DashboardCard 
                        title="Show Projects" 
                        text="Manage project information" 
                        buttonText="Manage Projects"
                        onClick={() => navigate('/projects')}
                        iconClass="fas fa-briefcase"
                        buttonColor="#2196f3"
                    />
                    <DashboardCard 
                        title="Calls Section" 
                        text="Oversee and monitor calls" 
                        buttonText="Manage Calls"
                        onClick={() => navigate('/manage-calls')}
                        iconClass="fas fa-headset"
                        buttonColor="#f44336"
                    />
                    <DashboardCard 
                        title="Manage Expenses" 
                        text="Track monthly expenses" 
                        buttonText="Manage Expenses"
                        onClick={() => navigate('/manage-expenses')}
                        iconClass="fas fa-wallet"
                        buttonColor="#9c27b0"
                    />
                    <DashboardCard 
                        title="Daily Reports" 
                        text="Analyze and view reports" 
                        buttonText="View Reports"
                        onClick={() => navigate('/view-reports')}
                        iconClass="fas fa-chart-bar"
                        buttonColor="#ff9800"
                    />
                    <DashboardCard 
                        title="View Users/Clients" 
                        text="Access user and client data" 
                        buttonText="View Clients"
                        onClick={() => navigate('/view-users')}
                        iconClass="fas fa-address-book"
                        buttonColor="#03a9f4"
                    />
                </Row>

                {/* Monthly Expenses Section */}
                <Row>
                    <Col md={12}>
                        <Card 
                            className="p-4 animate__animated animate__fadeInRight"
                            style={{ ...customStyles.card, backgroundColor: '#aaaaa', color: '#ffff' }}
                        >
                            <Card.Body>
                                <h4 className="text-center mb-5 text-primary" style={customStyles.title}>Monthly Expenses Report</h4>
                                <MonthlyExpensesChart data={expenses} colors={customStyles.chartColors} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Footer />

            <style jsx>{`
                .position-absolute {
                    filter: brightness(0.7);
                }
                .card {
                    transition: all 0.3s ease;
                    border-radius: 12px;
                }
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.3);
                }
                .btn {
                    border-radius: 50px;
                    padding: 10px 20px;
                }
            `}</style>
        </div>
    );
}

export default AdminDashboard;
