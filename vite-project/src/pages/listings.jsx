// Listings.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useLazyQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../graphql/queries';
import '../styles/Listings.css';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';

const Listings = () => {
  const [searchInput, setSearchInput] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Use useLazyQuery instead of useQuery to fetch data on-demand
  const [fetchProperties, { data, loading, error }] = useLazyQuery(GET_PROPERTIES);

  const handleSearch = () => {
    fetchProperties({
      variables: {
        search: searchInput,
        property_type: propertyType,
        min_price: parseFloat(minPrice) || undefined,
        max_price: parseFloat(maxPrice) || undefined,
      },
    });
  };

  return (
    <Container fluid className="listings-page">
      <Navigation />
      <Container fluid className="content-container">
        
        {/* Search Section (Left) */}
        <Container className="search-section p-4">
          <h2>Find Property to Rent</h2>
          <Form className="search-bar d-flex align-items-center mb-3">
            <Form.Control
              type="text"
              placeholder="Search by City, Suburb, or Reference"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch}>Search</Button>
          </Form>

          <Row className="filter-row mt-4">
            <Col md="auto">
              <Form.Control
                as="select"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">Property Type</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
              </Form.Control>
            </Col>
            <Col md="auto">
              <Form.Control
                type="text"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </Col>
            <Col md="auto">
              <Form.Control
                type="text"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </Col>
          </Row>
        </Container>

        {/* Listings Section (Right) */}
        <Container className="listings-section">
          <h2>Available Properties</h2>
          {loading && <p>Loading properties...</p>}
          {error && <p>Error loading properties</p>}
          {data && data.properties.map((property) => (
            <div key={property.id} className="property-item">
              <h3>{property.name}</h3>
              <p>{property.description}</p>
              <p>Price: {property.price}</p>
            </div>
          ))}
        </Container>
      </Container>
      <Footer />
    </Container>
  );
};

export default Listings;
