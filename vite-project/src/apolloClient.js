import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client';

const authMiddleware = new ApolloLink((operation, forward) => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  // Add the token to the request headers
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return forward(operation);
});

const uri =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5001/graphql' // Local development server
    : 'https://my-backend-ibk6.onrender.com/graphql'; // Production server

const httpLink = new HttpLink({ uri });

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink), // Use the authMiddleware
  cache: new InMemoryCache(),
});

export default client;
