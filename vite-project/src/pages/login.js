import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../styles/Login.css';

function Login() {
  return (
    <Container className="mt-4">
      <h1>Login</h1>
      <Form>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;