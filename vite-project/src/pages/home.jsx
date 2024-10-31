import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Home.css';

const Home = () => {
  return (
    <Container fluid className="home-page-container">
      <Navigation />

      <Footer />
    </Container>
  );
};

export default Home;
