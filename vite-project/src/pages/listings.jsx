import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './Listings.css'; // Import custom CSS for iOS styling
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
    <Container fluid className="listings-container">
      {/* Top navigation bar */}
      <Navigation />

      <Container className="search-section p-4">
        <h1 className="text-center mb-4">Find Property to Rent</h1>
        <Form className="search-bar d-flex align-items-center justify-content-center mb-3">
          <Form.Control
            type="text"
            id="searchInput"
            placeholder="Search for a City, Suburb, or Web Reference"
            className="search-input"
          />
          <Button variant="primary" id="searchButton" className="search-btn" onClick={handleSearch}>
            Search
          </Button>
        </Form>

        <Row className="justify-content-md-center filter-row mt-4">
          <Col md="auto">
            <Form.Control as="select" className="filter-select">
              <option>Property Type</option>
              <option>House</option>
              <option>Apartment</option>
            </Form.Control>
          </Col>
          <Col md="auto">
            <Form.Control as="select" className="filter-select">
              <option>Min Price</option>
              <option>R500,000</option>
              <option>R1,000,000</option>
            </Form.Control>
          </Col>
          <Col md="auto">
            <Form.Control as="select" className="filter-select">
              <option>Max Price</option>
              <option>R2,000,000</option>
              <option>R5,000,000</option>
            </Form.Control>
          </Col>
          <Col md="auto">
            <Form.Control as="select" className="filter-select">
              <option>Bedrooms</option>
              <option>1</option>
              <option>2</option>
            </Form.Control>
          </Col>
          <Col md="auto">
            <Button variant="secondary" className="more-filters-btn">
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
