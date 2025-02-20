import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import NavBar from './NavBar';
import Footer from './Footer';
import ApexCharts from 'react-apexcharts'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

const customStyles = {
    cardStyle: {
        backgroundColor: '#ffffff',
        color: '#333333',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        padding: '20px',
        transition: 'transform 0.2s ease-in-out',
        cursor: 'pointer',
    },
    buttonStyle: {
        background: 'linear-gradient(90deg, #4caf50, #2196f3)', 
        color: '#ffffff', 
        borderRadius: '25px', 
        padding: '12px 30px', 
        border: 'none', 
        fontWeight: 'bold', 
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
    },
};

const DashboardCard = ({ title, text, buttonText, onClick, iconClass }) => (
    <div className="col-lg-4 col-md-6 mb-4">
        <div 
            className="card shadow-lg p-4" 
            style={customStyles.cardStyle}
        >
            <div className="d-flex flex-column align-items-start h-100">
                <h5 className="card-title mb-3 text-primary">
                    <i className={`${iconClass} me-2`}></i> {title}
                </h5>
                <p className="card-text">{text}</p>
                <button
                    style={customStyles.buttonStyle}
                    className="mt-auto w-100"
                    onClick={onClick}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    </div>
);

function AdvisorDashboard() {
    const navigate = useNavigate();

    const chartOptions = {
        chart: {
            type: 'line',
            height: 350,
            toolbar: {
                show: false
            },
            animations: { enabled: true, easing: 'easeinout', speed: 800 },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug'],
            title: {
                text: 'Months',
            },
        },
        yaxis: {
            title: {
                text: 'Number of Visits/Calls',
            },
        },
        colors: ['#4caf50', '#f44336'],
    };

    const chartSeries = [
        {
            name: 'Site Visits',
            data: [10, 20, 15, 25, 30, 40, 35,50],
        },
        {
            name: 'Calls Made',
            data: [5, 10, 7, 15, 12, 20, 18,30],
        }
    ];

    return (
        <div className="d-flex flex-column min-vh-100 bg-gradient">
            <NavBar title="Advisor Dashboard" role="advisor" />
            <div className="container-fluid p-5 position-relative">
                
                {/* Title Section with Animation */}
                <div className="row mb-4 text-center animate__animated animate__fadeInDown">
                    <div className="col-12">
                    <h1 className="display-5" style={{ color: '#00E396', fontFamily: 'Poppins, sans-serif' }}>
                            Manage Sites and Projects Effortlessly & Professionally
                        </h1>
                    </div>
                </div>

                {/* Dashboard Cards with Hover Animation */}
                <div className="row">
                    <DashboardCard 
                        title="Manage Site Visits" 
                        text="Schedule site visits for clients" 
                        buttonText="Schedule Site Visits"
                        onClick={() => navigate('/schedule-site-visits')}
                        iconClass="fas fa-calendar-alt"
                    />
                    
                    <DashboardCard 
                        title="Calls Section" 
                        text="Track and manage calls" 
                        buttonText="Manage Calls"
                        onClick={() => navigate('/manage-calls')}
                        iconClass="fas fa-phone-alt"
                    />
                    <DashboardCard 
                        title="Add New Clients(Participation Form)" 
                        text="Participation Form" 
                        buttonText="Add Client"
                        onClick={() => navigate('/FormTableApp')}
                        iconClass="fa-solid fa-address-card"
                    />
                </div>

                {/* Chart Section with Animation */}
                <div className="row mt-5 animate__animated animate__fadeInUp">
                    <div className="col-12">
                        <h2 className="text-center mb-4 text-light">Performance Overview</h2>
                        <ApexCharts
                            options={chartOptions}
                            series={chartSeries}
                            type="line"
                            height={350}
                        />
                    </div>
                </div>
            </div>

            <Footer />

            <style jsx>{`
                /* Gradient Background */
                .bg-gradient {
                    background: linear-gradient(135deg, #283048, #859398) !important;
                    color: #fff;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }

                /* Card Hover Effect */
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                }

                /* Button Hover Effect */
                .card button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
                }

                /* Animated Text */
                .display-5 {
                    color: #4caf50;
                    font-weight: 300;
                    font-size: 3rem;
                }

                .card-text {
                    color: #666;
                }

                /* General Styling for Cards */
                .card {
                    border-radius: 12px;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .btn-outline-secondary {
                    border-radius: 25px;
                    padding: 10px 20px;
                    transition: background-color 0.3s ease;
                }
            `}</style>
        </div>
    );
}

export default AdvisorDashboard;
