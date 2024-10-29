import {Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Listings.css'; // Import custom CSS for modern styling
import Navigation from '../components/Navbar'; // Import the Navbar component
import Footer from '../components/Footer'; // Import the Footer component

const Listings = () => {
    const handleSearch = () => {
      const query = document.getElementById('searchInput').value;
      if (query) {
        window.location.href = `/search?query=${query}`;
      }
    };
  return (
    <Container fluid>
      {/* Top navigation bar */}
      <Navigation />
      <Container className="search-section">
        <h1 className="text-center">Find Property to Rent</h1>
        <Form inline className="justify-content-center">
          <Form.Control
            type="text"
            id="searchInput"
            placeholder="Search for a City, Suburb or Web Reference"
            className="mr-sm-2"
          />
          <Button variant="primary" id="searchButton" onClick={handleSearch}>
            Search
          </Button>
        </Form>
        <Row className="justify-content-md-center mt-4">
          <Col md="auto">
            <Form.Control as="select" className="filter mr-sm-2">
              <option>Property Type</option>
              <option>House</option>
              <option>Apartment</option>
            </Form.Control>
          </Col>
          <Col md="auto">
            <Form.Control as="select" className="filter mr-sm-2">
              <option>Min Price</option>
              <option>R500,000</option>
              <option>R1,000,000</option>
            </Form.Control>
          </Col>
          <Col md="auto">
            <Form.Control as="select" className="filter mr-sm-2">
              <option>Max Price</option>
              <option>R2,000,000</option>
              <option>R5,000,000</option>
            </Form.Control>
          </Col>
          <Col md="auto">
            <Form.Control as="select" className="filter mr-sm-2">
              <option>Bedrooms</option>
              <option>1</option>
              <option>2</option>
            </Form.Control>
          </Col>
          <Col md="auto">
            <Button variant="secondary" className="filter">
              More Filters
            </Button>
          </Col>
        </Row>
      </Container>
      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default Listings;