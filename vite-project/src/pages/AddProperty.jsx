import React, { useState } from 'react'; 
import { Form, Button, Container } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_PROPERTY } from '../graphql/queries';
import Navigation from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/AddProperty.css';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    description: '',
    property_type: '',
  });

  const [images, setImages] = useState(['']); // Initialize with one empty image field
  const [addProperty] = useMutation(ADD_PROPERTY);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const addImageField = () => setImages([...images, '']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Retrieve user_id from localStorage
    const userId = localStorage.getItem('user_id');
    
    // Prepare and convert payload to match expected types
    const payload = { 
        ...formData, 
        price: parseFloat(formData.price),  // Convert price to Float
        images: images.length ? images : null,  // Ensure images is either an array or null
        user_id: userId 
    };
    
    try {
        console.log("Payload being sent to server:", payload); // Log the entire payload for debugging
        
        await addProperty({ 
            variables: payload // Send the transformed payload
        });
        
        alert('Property added successfully!');
    } catch (error) {
        console.error('Error adding property:', error);
        alert('Error adding property.');
    }
};


  return (
    <Container fluid className="add-property-page">
      <Navigation />
      <Container className="form-container">
        <h2>Add New Property</h2>
        <Form onSubmit={handleSubmit}>
          {/* Basic form fields */}
          <Form.Group controlId="formName">
            <Form.Label>Property Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter property name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPropertyType">
            <Form.Label>Property Type</Form.Label>
            <Form.Control
              as="select"
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              required
            >
              <option value="">Select property type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
            </Form.Control>
          </Form.Group>

          {/* Dynamic image URL inputs */}
          <Form.Label>Image URLs</Form.Label>
          {images.map((image, index) => (
            <Form.Group key={index} controlId={`formImageUrl${index}`}>
              <Form.Control
                type="text"
                placeholder={`Enter image URL ${index + 1}`}
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
            </Form.Group>
          ))}
          <Button variant="secondary" onClick={addImageField}>
            Add Another Image
          </Button>

          <Button variant="primary" type="submit" className="mt-3">
            Add Property
          </Button>
        </Form>
      </Container>
      <Footer />
    </Container>
  );
};

export default AddProperty;
