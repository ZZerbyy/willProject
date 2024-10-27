import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/Listings.css';

function Listings() {
  return (
    <Container className="mt-4">
      <h1>Property Listings</h1>
      <p>Explore the properties available for rent and purchase.</p>
    </Container>
  );
}

export default Listings;