import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavBar from './NavBar';
import Footer from './Footer';
import ApexCharts from 'react-apexcharts';

const customStyles = {
    cardStyle: {
        backgroundColor: '#ffffff',
        color: '#333333',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        borderRadius: '12px',
        padding: '20px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    gradientBackground: {
        background: 'linear-gradient(135deg, #2e3440, #4c566a)',
        color: '#eceff4',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    gradientButton: {
        background: 'linear-gradient(90deg, #4caf50, #2196f3)',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
};

// Dashboard Card Component with Gradient Button
const DashboardCard = ({ title, text, buttonText, onClick, iconClass }) => (
    <div className="col-lg-4 col-md-6 mb-4 animate__animated animate__fadeInUp">
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
                    className="w-100 mt-auto animate__animated "
                    style={customStyles.gradientButton}
                    onClick={onClick}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    </div>
);

function TelecallerDashboard() {
    const navigate = useNavigate();
    const [isDarkMode, setDarkMode] = useState(false);

    const handleThemeToggle = () => setDarkMode(!isDarkMode);

    const chartOptions = {
        chart: {
            type: 'area',
            height: 350,
            toolbar: { show: false },
            animations: { enabled: true, easing: 'easeinout', speed: 800 },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: { text: 'Months' },
        },
        yaxis: {
            title: { text: 'Number of Calls' },
        },
        colors: ['#00E396'],
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            }
        },
    };

    const chartSeries = [
        { name: 'Calls Made', data: [30, 40, 35, 50, 60, 70, 90] },
    ];

    return (
        <div style={customStyles.gradientBackground}>
            <NavBar title="Telecaller Dashboard" role="telecaller" />

            <div className="container-fluid p-5">
                <div className="row mb-4 text-center">
                    <div className="col-12">
                        <h1 className="display-5 font-weight-bold">
                            Manage Customer Interactions and Calls Effortlessly
                        </h1>
                    </div>
                </div>

                {/* Dashboard Cards */}
                <div className="row">
                    <DashboardCard 
                        title="Manage Customers" 
                        text="Handle customer data efficiently" 
                        buttonText="Manage Customers"
                        onClick={() => navigate('/manage-customers')}
                        iconClass="fas fa-users"
                    />
                    <DashboardCard 
                        title="Manage Calls" 
                        text="Track and manage your calls" 
                        buttonText="Manage Calls"
                        onClick={() => navigate('/manage-calls')}
                        iconClass="fas fa-phone"
                    />
                    <DashboardCard 
                        title="Manage and Upload ExcelSheet" 
                        text="Track and manage your calls" 
                        buttonText="Manage and Upload Files "
                        onClick={() => navigate('/upload-page ')}
                        iconClass="fas fa-desktop"
                    />
                    
                </div>

                {/* Chart Section with Fade-in Animation */}
                <div className="row mt-5">
                    <div className="col-12 animate__animated animate__fadeInUp">
                        <h2 className="text-center mb-4">Monthly Calls Overview</h2>
                        <ApexCharts
                            options={chartOptions}
                            series={chartSeries}
                            type="area"
                            height={350}
                        />
                    </div>
                </div>
            </div>

            <Footer />

            <style jsx>{`
                .card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    cursor: pointer;
                }
                .card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                }
                .display-5 {
                    color: #00E396;
                    font-weight: 600;
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

export default TelecallerDashboard;
