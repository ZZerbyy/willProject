const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const root = require('./graphql/resolvers');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
