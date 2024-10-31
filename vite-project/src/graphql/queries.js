import gql from 'graphql-tag';






// Add a new user
export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      id
      username
      email
      created_at
    }
  }
`;

// Update user details (protected)
export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $username: String, $email: String) {
    updateUser(id: $id, username: $username, email: $email) {
      id
      username
      email
    }
  }
`;

// Delete a user (protected, role-based access control)
export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      username
    }
  }
`;

// PROPERTY QUERIES AND MUTATIONS

// Fetch all properties with optional filters


// Fetch properties by user ID
export const GET_PROPERTIES_BY_USER = gql`
  query GetPropertiesByUser($user_id: ID!) {
    propertiesByUser(user_id: $user_id) {
      id
      name
      location
      price
      description
      property_type
      created_at
    }
  }
`;

// Fetch a single property by ID


// Add a new property (protected)


// Delete a property (protected)
export const DELETE_PROPERTY = gql`
  mutation DeleteProperty($id: ID!) {
    deleteProperty(id: $id) {
      id
      name
    }
  }
`;

// FAVORITES AND WISHLIST QUERIES AND MUTATIONS

// Add to favorites (protected)
export const ADD_FAVORITE = gql`
  mutation AddFavorite($user_id: ID!, $property_id: ID!) {
    addFavorite(user_id: $user_id, property_id: $property_id) {
      user_id
      property_id
      created_at
    }
  }
`;

// Remove from favorites (protected)
export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($user_id: ID!, $property_id: ID!) {
    removeFavorite(user_id: $user_id, property_id: $property_id) {
      user_id
      property_id
    }
  }
`;

// Fetch favorites by user (protected)
export const GET_FAVORITES_BY_USER = gql`
  query GetFavoritesByUser($user_id: ID!) {
    favoritesByUser(user_id: $user_id) {
      property_id
      created_at
    }
  }
`;

// Add to wishlist (protected)
export const ADD_WISHLIST = gql`
  mutation AddWishlist($user_id: ID!, $property_id: ID!) {
    addWishlist(user_id: $user_id, property_id: $property_id) {
      user_id
      property_id
      created_at
    }
  }
`;

// Fetch wishlist by user (protected)
export const GET_WISHLIST_BY_USER = gql`
  query GetWishlistByUser($user_id: ID!) {
    wishlistByUser(user_id: $user_id) {
      property_id
      created_at
    }
  }
`;


export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

// USER QUERIES AND MUTATIONS
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      email
      created_at
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    userById(id: $id) {
      id
      username
      email
      created_at
      properties {
        id
        name
        location
        price
        description
        property_type
        images 
      }
    }
  }
`;

// PROPERTY QUERIES AND MUTATIONS
export const GET_PROPERTIES = gql`
  query GetProperties($property_type: String, $min_price: Float, $max_price: Float) {
    properties(property_type: $property_type, min_price: $min_price, max_price: $max_price) {
      id
      name
      location
      price
      description
      property_type
      created_at
      images 
    }
  }
`;

export const GET_PROPERTY_BY_ID = gql`
  query GetPropertyById($id: ID!) {
    propertyById(id: $id) {
      id
      name
      location
      price
      description
      property_type
      created_at
      images 
    }
  }
`;

export const ADD_PROPERTY = gql`
  mutation AddProperty($name: String!, $location: String!, $price: Float!, $description: String!, $property_type: String!, $user_id: ID!, $images: [String!]) {
    addProperty(name: $name, location: $location, price: $price, description: $description, property_type: $property_type, user_id: $user_id, images: $images) {
      id
      name
      location
      price
      description
      property_type
      created_at
      images 
    }
  }
`;

export const UPDATE_PROPERTY = gql`
  mutation UpdateProperty($id: ID!, $name: String, $location: String, $price: Float, $description: String, $property_type: String, $images: [String!]) {
    updateProperty(id: $id, name: $name, location: $location, price: $price, description: $description, property_type: $property_type, images: $images) {
      id
      name
      location
      price
      description
      property_type
      images 
    }
  }
`;

