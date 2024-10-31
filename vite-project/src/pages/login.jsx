// src/pages/Login.jsx
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/queries';
import '../styles/SignUp.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const [login, { error }] = useMutation(LOGIN);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await login({
        variables: { email, password }
      });
      
      if (data.login) {
        const { token, user } = data.login;
        localStorage.setItem('token', token); // Store token
        localStorage.setItem('isLoggedIn', 'true'); // Optional: to use for other checks
        navigate('/'); // Redirect to home after login
      } else {
        alert('Login failed.');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <Container className="login-container">
      <h1>Login / <Link to="/signUp">Sign-Up</Link></h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Remember Me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
      {error && <p className="error-text">Error: {error.message}</p>}
    </Container>
  );
}

export default Login;
