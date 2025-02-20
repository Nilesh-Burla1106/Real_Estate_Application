import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import backgroundVideo from '/main3.mp4';

function Home() {
    const navigate = useNavigate();
    const [showTopAnimation, setShowTopAnimation] = useState(true);
    const [showBottomContent, setShowBottomContent] = useState(false);

    useEffect(() => {
        // First animation for top section
        const topTimer = setTimeout(() => {
            setShowTopAnimation(false);
            setShowBottomContent(true);
        }, 3400); // Delay for top section

        return () => clearTimeout(topTimer);
    }, []);

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div style={{ height: '100vh', overflow: 'hidden', color: '#f5f5f5' }}>
            {/* Top section with video background */}
            <div style={{ position: 'relative', height: '56vh', overflow: 'hidden' }}>
                <video
                    src={backgroundVideo}
                    autoPlay
                    loop
                    muted
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        minWidth: '100%',
                        minHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        zIndex: -2,
                        transform: 'translate(-50%, -50%)',
                        objectFit: 'cover',
                        filter: 'brightness(60%)' // Slight darkening for better readability
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(120deg, rgba(58, 93, 174, 0.6), rgba(34, 34, 34, 0.8))',
                    zIndex: -1
                }}></div>

                {/* Centered content on top section */}
                {showTopAnimation && (
                    <section style={{
                        height: '40vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <div className="p-5 bg-white bg-opacity-75 rounded animate__animated animate__fadeIn">
                            <div id="container" className="text-center">
                                <h1 style={{ marginBottom: '35px', fontSize: '5rem', letterSpacing: '0.5rem', fontWeight: 'bold' }}>
                                    {['SANMITRA', 'DEVELOPERS'].map((letter, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                display: 'inline-block',
                                                opacity: 0,
                                                animation: `fadeInRotate 1.5s ease forwards ${0.5 + index * 0.5}s`,
                                                color: '#ffffff',
                                                textShadow: '0px 4px 20px rgba(0, 0, 0, 0.75)'
                                            }}
                                        >
                                            {letter}
                                        </span>
                                    ))}
                                </h1>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* Bottom section with white background */}
            {showBottomContent && (
                <div style={{
                    height: '1vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #ff512f, #dd2476)',
                }}>
                    <div className="p-5 bg-white rounded shadow-lg text-center text-dark" style={{ maxWidth: '900px' }}>
                        <h1 className="display-4 mb-4 animate__animated animate__fadeInDown" style={{ color: '#333', textShadow: '2px 4px 10px rgba(0,0,0,0.5)' }}>
                            Welcome to Sanmitra Developers
                        </h1>
                        <h2 className="display-5 mb-4 animate__animated animate__fadeInDown" style={{ color: '#555' }}>
                            True friends of investors
                        </h2>
                        <p className="lead mb-4 animate__animated animate__fadeInUp animate__delay-1s" style={{ color: '#777' }}>
                            Manage properties with ease and convenience.
                        </p>
                        <button
                            onClick={handleGetStarted}
                            className="btn btn-lg animate__animated animate__pulse animate__infinite"
                            style={{
                                background: 'linear-gradient(135deg, #ff512f, #dd2476)',
                                color: '#fff',
                                boxShadow: '0px 4px 15px rgba(255, 82, 82, 0.5)',
                                borderRadius: '25px'
                            }}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                /* Enhanced keyframe animations */
                @keyframes fadeInRotate {
                    0% {
                        opacity: 0;
                        transform: rotateY(90deg);
                        filter: blur(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: rotateY(0deg);
                        filter: blur(0px);
                    }
                }
                /* Particle effect */
                .particle {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 5px;
                    height: 5px;
                    background-color: rgba(255, 255, 255, 0.7);
                    border-radius: 50%;
                    animation: float 8s ease-in-out infinite;
                    z-index: 1;
                }
                @keyframes float {
                    0% {
                        transform: translateY(0px) translateX(0px);
                    }
                    50% {
                        transform: translateY(-80px) translateX(30px);
                    }
                    100% {
                        transform: translateY(0px) translateX(0px);
                    }
                }
                /* Button hover */
                button:hover {
                    transform: scale(1.05);
                    box-shadow: 0px 4px 25px rgba(255, 82, 82, 0.7);
                    transition: all 0.3s ease;
                }
            `}</style>
        </div>
    );
}

export default Home;
