const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const auth = require('./auth');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware to check for a JWT token
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    const user = auth.verifyToken(token);
    req.user = user; // Attach the user to the request if verified
  }
  next();
});

// GraphQL setup with user in context
app.use('/graphql', graphqlHTTP((req) => ({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
  context: { user: req.user }, // Pass user to context
})));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`GraphQL server running on http://localhost:${port}/graphql`);
});
