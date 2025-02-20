import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'animate.css';  // Import animate.css for animations
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto animate__animated animate__fadeInUp">
      <Container>
        <Row>
          <Col md={4} className="text-center mb-3">
            <h5>SANMITRA DEVELOPERS .</h5>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </Col>
          <Col md={4} className="text-center mb-3">
            <h5>Contact Us</h5>
            <p>support@company.com</p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center">
              <a href="https://facebook.com" className="text-white mx-3">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" className="text-white mx-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" className="text-white mx-3">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
