import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../graphql/queries'; // Make sure the path is correct
import '../styles/SignUp.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addUser, { loading, error }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await addUser({
        variables: {
          username,
          email,
          password,
        },
      });

      if (data && data.addUser) {
        alert('Sign-up successful!');
        navigate('/login'); // Redirect to login page after successful sign-up
      }
    } catch (err) {
      console.error('Error signing up:', err);
      alert('Error signing up. Please try again.');
    }
  };

  return (
    <Container className="signup-container">
      <h1>Sign Up / <Link to="/login">Login</Link></h1>
      <Form onSubmit={handleSignUp}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
        {error && <p className="error-text">Error: {error.message}</p>}
      </Form>
    </Container>
  );
}

export default SignUp;
