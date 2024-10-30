// server.js
const express = require('express');
const cors = require('cors'); // Import CORS
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const auth = require('./auth'); // Import the auth module
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Replace with the URL of your frontend app
  methods: ['GET', 'POST', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Middleware to check for JWT and attach user to request
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const user = auth.verifyToken(token);
      req.user = user; // Attach user to request if token is valid
    } catch (error) {
      console.error('Invalid token');
    }
  }
  next();
});

// GraphQL setup with user context
app.use('/graphql', graphqlHTTP((req) => ({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
  context: { user: req.user }, // Pass user to context for resolvers
})));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`GraphQL server running on http://localhost:${port}/graphql`);
});
