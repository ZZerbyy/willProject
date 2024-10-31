import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Navigation from '../components/Navbar';  // Import the Navbar component
import Footer from '../components/Footer';  // Import the Footer component
import '../styles/About.css';  // Link the custom CSS

const About = () => {
  return (
    <div>
      <Navigation />  {/* Include the Navbar component */}
      
      <Footer />  {/* Include the Footer */}
    </div>
  );
};

export default About;
