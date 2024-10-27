import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/SignUp.css';

function SignUp() {
  return (
    <Container className="mt-4">
      <h1>Sign Up</h1>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default SignUp;