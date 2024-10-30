import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { LOGIN } from '../graphql/queries'; // Import LOGIN mutation
import { fetchData } from '../graphql/api'; // Import API helper function
import './SignUp.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const { login } = await fetchData(LOGIN, { email, password });
      
      if (login) {
        const { token, user } = login;
        localStorage.setItem('token', token);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/'); // Redirect after login
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
    </Container>
  );
}

export default Login;
