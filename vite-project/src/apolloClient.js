// src/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://my-backend-ibk6.onrender.com/graphql', // Update with your GraphQL endpoint
  }),
  cache: new InMemoryCache(),
});

export default client;
