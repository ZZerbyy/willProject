const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    users: [User]
    userById(id: ID!): User

    # Fetch properties with optional filters
    properties(property_type: String, min_price: Float, max_price: Float): [Property]
    propertiesByUser(user_id: ID!): [Property]
    propertyById(id: ID!): Property

    favoritesByUser(user_id: ID!): [Favorite] 
    wishlistByUser(user_id: ID!): [Wishlist]
    
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    addUser(username: String!, email: String!, password: String!): User
    updateUser(id: ID!, username: String, email: String): User
    deleteUser(id: ID!): User

    addProperty(
      name: String!,
      location: String!,
      price: Float!,
      description: String!,
      property_type: String!, # New field added
      user_id: ID!
      images: [String] # Allow array of image URLs as input
    ): Property
    
    updateProperty(
      id: ID!,
      name: String,
      location: String,
      price: Float,
      description: String,
      property_type: String # New field added
    ): Property
    
    deleteProperty(id: ID!): Property

    addFavorite(user_id: ID!, property_id: ID!): Favorite 
    addWishlist(user_id: ID!, property_id: ID!): Wishlist
    removeFavorite(id: ID!): Favorite
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
    property_type: String # New field added
    user_id: ID
    created_at: String
     images: [Image] # Add this line
  }
  
  type Favorite { 
    id: ID 
    user_id: ID 
    property_id: ID 
    created_at: String 
  } 
     type Image {
    id: ID!
    property_id: ID!
    image_url: String!
  } 
  type Wishlist { 
    id: ID 
    user_id: ID 
    property_id: ID 
    created_at: String 
  }
`);

module.exports = schema;
