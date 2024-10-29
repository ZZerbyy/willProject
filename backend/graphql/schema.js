const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
    properties: [Property]
  }

  type Property {
    id: ID
    name: String
    location: String
    price: Float
  }
`);

module.exports = schema;
