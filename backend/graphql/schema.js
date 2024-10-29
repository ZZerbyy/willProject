const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    users: [User]
    properties: [Property]
    propertyById(id: ID!): Property
  }

  type User {
    id: ID
    username: String
    email: String
    password: String
    created_at: String
    properties: [Property]
  }

  type Property {
    id: ID
    name: String
    location: String
    price: Float
    description: String
    user_id: ID
    created_at: String
  }
`);

module.exports = schema;

