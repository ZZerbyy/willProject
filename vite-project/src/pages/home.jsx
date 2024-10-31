// src/pages/Home.jsx
import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Home.css';

const Home = ({ properties = [] }) => { // Default to empty array if properties is undefined
  return (
    <Container fluid className="home-page-container">
      <Navigation />

      {/* Hero Section */}
      <div className="hero-section">
        <h1>Find Your Dream Property</h1>
        <p>Browse through thousands of listings to find the perfect place.</p>
        <Link to="/add-property">
          <Button variant="primary" className="hero-button">Add Your Property</Button>
        </Link>
      </div>

      {/* Featured Properties Section */}
      <Container className="featured-properties">
        <h2 className="section-title">Featured Properties</h2>
        <Row>
          {properties && properties.length > 0 ? (
            properties.map((property, index) => (
              <Col md={4} className="property-card" key={index}>
                <img src={property.image_url || "https://via.placeholder.com/300x200"} alt={property.name} className="property-image" />
                <h3>{property.name}</h3>
                <p>${property.price} / month</p>
              </Col>
            ))
          ) : (
            <p>No properties available.</p> // Message when there are no properties to display
          )}
        </Row>
      </Container>

      <Footer />
    </Container>
  );
};

export default Home;
