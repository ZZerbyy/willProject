const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const auth = require('./auth');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
require('dotenv').config();

async function startApolloServer() {
  const app = express();

  app.use(express.json()); // Parse JSON bodies

  // Debugging middleware to log incoming requests
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);  // Should now log the actual request body
    next();
  });

  // Enable CORS for all routes
  app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // JWT Middleware to verify token and attach user to request
  app.use((req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const user = auth.verifyToken(token);
        req.user = user; // Attach user if token is valid
      } catch (error) {
        console.error('Invalid token');
      }
    }
    next();
  });

  // Initialize Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user }), // Pass user to context
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' }); // Apply Apollo middleware

  // Start Express server
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
  });
}

// Start Apollo Server
startApolloServer().catch((error) => {
  console.error('Error starting server:', error);
});
