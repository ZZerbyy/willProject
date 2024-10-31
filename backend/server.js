const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const auth = require('./auth');
const typeDefs = require('./graphql/schema'); // Your GraphQL schema definitions
const resolvers = require('./graphql/resolvers'); // Your resolvers
require('dotenv').config();

async function startApolloServer() {
  const app = express();
  app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});
  // Enable CORS for all routes
  app.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend origin
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // JWT Middleware
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

  // Initialize Apollo Server with schema, resolvers, and context
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user }), // Pass user to resolvers
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' }); // Apply middleware to /graphql path

  // Start the server
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
  });
}

// Start the Apollo Server
startApolloServer().catch((error) => {
  console.error('Error starting server:', error);
});
