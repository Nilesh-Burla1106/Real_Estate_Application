import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import NavBar from './NavBar';
import Footer from './Footer';
import ApexCharts from 'react-apexcharts';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Custom Inline Theme Styles
const customStyles = {
    cardStyle: {
        backgroundColor: '#ffffff',
        color: '#333333',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        padding: '20px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        height: '100%',
    },
    buttonStyle: {
        backgroundImage: 'linear-gradient(90deg, #4caf50, #2196f3)',
        color: '#ffffff',
        borderRadius: '25px',
        padding: '10px 25px',
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease',
    },
};

// Dashboard Card Component
const DashboardCard = ({ title, text, buttonText, onClick, iconClass }) => (
    <div className="col-lg-4 col-md-6 mb-4">
        <div
            className="card shadow-lg p-4"
            style={customStyles.cardStyle}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
            <div className="d-flex flex-column align-items-start h-100">
                <h5 className="card-title mb-3">
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

function AccountantDashboard() {
    const navigate = useNavigate();
    const [isDarkMode, setDarkMode] = useState(false);

    const handleThemeToggle = () => setDarkMode(!isDarkMode);

    // Sample data for the chart
    const chartOptions = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
                text: 'Months',
            },
        },
        yaxis: {
            title: {
                text: 'Expenses ($)',
            },
        },
        colors: ['#4e73df'], // Enhanced color for consistency
        plotOptions: {
            bar: {
                borderRadius: 10,
                columnWidth: '55%',
                distributed: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$" + val;
                },
            },
        },
    };

    const chartSeries = [
        {
            name: 'Expenses',
            data: [500, 700, 400, 600, 900, 800, 1200], // Sample expense data
        }
    ];

    return (
        <div className={`d-flex flex-column min-vh-100 ${isDarkMode ? 'bg-dark' : 'bg-light'}`}
            style={{
                background: 'linear-gradient( #283048, #859398)',
            }}>
            <NavBar title="Accountant Dashboard" role="accountant" />
            <div className={`container-fluid p-5 position-relative`}>
                
                {/* Background Image Overlay */}
                <div className="overlay"></div>

                {/* Title Section */}
                <div className="row mb-4 text-center animate__animated animate__fadeInDown">
                    <div className="col-12">
                    <h1 className="display-5" style={{ color: '#00E396', fontFamily: 'Poppins, sans-serif' }}>
                            Manage Financial Records Effortlessly
                        </h1>
                    </div>
                   
                </div>

                {/* Dashboard Cards */}
                <div className="row justify-content-center">
                    <DashboardCard
                        title="Manage Expenses"
                        text="Track and manage expenses"
                        buttonText="Manage Expenses"
                        onClick={() => navigate('/manage-expenses')}
                        iconClass="fas fa-money-bill-wave"
                    />
                </div>

                {/* Chart Section */}
                <div className="row mt-5">
                    <div className="col-12">
                        <h2 className="text-center mb-4 text-light">Monthly Expenses Overview</h2>
                        <ApexCharts
                            options={chartOptions}
                            series={chartSeries}
                            type="bar"
                            height={350}
                        />
                    </div>
                </div>
            </div>

            <Footer />

            <style jsx>{`
                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient( #283048, #859398);
                    opacity: 0.9;
                    z-index: -1;
                }
                .card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                }
                .btn-outline-secondary {
                    border-radius: 25px;
                    padding: 10px 20px;
                    transition: background-color 0.3s ease;
                }
                .btn-outline-secondary:hover {
                    background-color: #ffffff;
                    color: #007bff;
                }
            `}</style>
        </div>
    );
}

export default AccountantDashboard;
