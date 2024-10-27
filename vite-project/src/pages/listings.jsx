import { Container, Row, Col, Table } from 'react-bootstrap';
import './Listings.css'; // Import custom CSS for modern styling
import Navigation from '../components/Navbar'; // Import the Navbar component
import Footer from '../components/Footer'; // Import the Footer component

const Listings = () => {
  return (
    <Container fluid>
      {/* Top navigation bar */}
      <Navigation />
      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default Listings;