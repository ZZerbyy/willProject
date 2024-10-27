import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../SignUp.css';

function SignUp() {
  return (
    <Container className="signup-container">
      <h1>Sign Up</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default SignUp;