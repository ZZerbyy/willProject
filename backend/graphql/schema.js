const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    users: [User]
    userById(id: ID!): User
    properties: [Property]
    propertiesByUser(user_id: ID!): [Property]
    propertyById(id: ID!): Property
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    addUser(username: String!, email: String!, password: String!): User
    updateUser(id: ID!, username: String, email: String): User
    deleteUser(id: ID!): User

    addProperty(name: String!, location: String!, price: Float!, description: String!, user_id: ID!): Property
    updateProperty(id: ID!, name: String, location: String, price: Float, description: String): Property
    deleteProperty(id: ID!): Property
  }

  type User {
    id: ID
    username: String
    email: String
    created_at: String
    properties: [Property]
  }
 type AuthPayload {
    token: String
    user: User
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
