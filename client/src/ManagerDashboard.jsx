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
        backgroundColor: '#f0f9ff',
        color: '#05445e',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px',
        padding: '20px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        border: '1px solid #82c4f9',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#032f61',
    },
    hover: {
        transform: 'translateY(-10px)',
        boxShadow: '0 12px 25px rgba(0, 0, 0, 0.15)',
    },
    button: {
        borderRadius: '30px',
        padding: '10px 25px',
        background: 'linear-gradient(90deg, #4caf50, #2196f3)',
        color: '#fff',
        border: 'none',
    },
    chartColors: ['#3a9ec4', '#82c4f9', '#f0f9ff'],
    backgroundOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(3, 47, 97, 0.6)',
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
                <h5 className="card-title mb-3" style={{ color: '#032f61', fontWeight: '700' }}>
                    <i className={`${iconClass} me-2`}></i> {title}
                </h5>
                <p className="card-text" style={{ color: '#555', lineHeight: '1.6' }}>{text}</p>
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

function ManagerDashboard() {
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
        <div style={{ background: 'linear-gradient( #283048, #859398)', minHeight: '100vh', position: 'relative' }}>
            <NavBar title="Manager Dashboard" role="manager" />
            <div className="container-fluid p-5 position-relative">
                {/* Background Image Overlay */}
                <div 
                    className="position-absolute w-100 h-100" 
                    style={{
                        ...customStyles.backgroundOverlay,
                        backgroundImage: 'url(/manager-bg.jpg)',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                ></div>

                {/* Title Section */}
                <div className="text-center mb-5 animate__animated animate__fadeInDown">
                    <h1 className="display-5" style={{ color: '#00E396', fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                        Oversee and Manage Site Visits, Client Interactions, and Finances
                    </h1>
                </div>

                {/* Dashboard Cards */}
                <Row className="mb-5">
                    <DashboardCard 
                        title="Site Visits" 
                        text="Schedule and monitor client site visits" 
                        buttonText="View Visits"
                        onClick={() => navigate('/schedule-site-visits')}
                        iconClass="fas fa-route"
                        buttonColor="#3a9ec4"
                    />
                    <DashboardCard 
                        title="Projects" 
                        text="Oversee project details and updates" 
                        buttonText="Projects Overview"
                        onClick={() => navigate('/projects')}
                        iconClass="fas fa-clipboard-list"
                        buttonColor="#82c4f9"
                    />
                    <DashboardCard 
                        title="Calls & Messages" 
                        text="Coordinate client calls and messages" 
                        buttonText="Manage Calls"
                        onClick={() => navigate('/manage-calls')}
                        iconClass="fas fa-phone-alt"
                        buttonColor="#76a9cc"
                    />
                    <DashboardCard 
                        title="Expense Tracking" 
                        text="Monitor and manage expenses" 
                        buttonText="View Expenses"
                        onClick={() => navigate('/manage-expenses')}
                        iconClass="fas fa-chart-pie"
                        buttonColor="#63b8d6"
                    />
                    <DashboardCard 
                        title="Manage Customers" 
                        text="Handle customer data efficiently" 
                        buttonText="Manage Customers"
                        onClick={() => navigate('/manage-customers')}
                        iconClass="fas fa-users"
                        buttonColor="#5e98c7"
                    />
                    <DashboardCard 
                        title="Manage and Upload ExcelSheet" 
                        text="Track and manage your calls" 
                        buttonText="Manage and Upload Files "
                        onClick={() => navigate('/upload-page ')}
                        iconClass="fas fa-desktop"
                    />
                </Row>

                {/* Monthly Expenses Section */}
                <Row>
                    <Col md={12}>
                        <Card 
                            className="p-4 animate__animated animate__fadeInRight"
                            style={{ ...customStyles.card, backgroundColor: '#e0f7fa', color: '#05445e' }}
                        >
                            <Card.Body>
                                <h4 className="text-center mb-5" style={customStyles.title}>Monthly Expenses Overview</h4>
                                <MonthlyExpensesChart data={expenses} colors={customStyles.chartColors} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Footer />

            <style jsx>{`
                .position-absolute {
                    filter: brightness(0.8);
                }
                .card {
                    transition: all 0.3s ease;
                    border-radius: 15px;
                }
                .card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.2);
                }
                .btn {
                    border-radius: 30px;
                    padding: 10px 25px;
                }
            `}</style>
        </div>
    );
}

export default ManagerDashboard;
