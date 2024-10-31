const supabase = require('../utils/supabaseClient');
const auth = require('../auth');

const resolvers = {
  Query: {
    // USER RESOLVERS

    // Fetch all users (protected)
    users: async (_, __, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const { data, error } = await supabase.from('users').select('id, username, email, created_at');
      if (error) throw new Error(error.message);
      return data;
    },

    // Fetch a single user by ID (protected)
    userById: async (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const { data, error } = await supabase.from('users').select('id, username, email, created_at, properties(*)').eq('id', id).single();
      if (error) throw new Error(error.message);
      return data;
    },

    // PROPERTY RESOLVERS

    // Fetch all properties with optional filters
    properties: async (_, { property_type, min_price, max_price }) => {
      let query = supabase.from('properties').select('*');

      if (property_type) query = query.eq('property_type', property_type);
      if (min_price !== undefined) query = query.gte('price', min_price);
      if (max_price !== undefined) query = query.lte('price', max_price);

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data;
    },

    // Fetch properties by user ID
    propertiesByUser: async (_, { user_id }) => {
      const { data, error } = await supabase.from('properties').select('*').eq('user_id', user_id);
      if (error) throw new Error(error.message);
      return data;
    },

    // Fetch a single property by ID
    propertyById: async (_, { id }) => {
      const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
      if (error) throw new Error(error.message);
      return data;
    }
  },

  Mutation: {
    // LOGIN MUTATION
    login: async (_, { email, password }) => {
      const { data, error } = await supabase.from('users').select('id, username, email, password').eq('email', email).single();

      if (error || !data) throw new Error('User not found');
      
      const validPassword = await auth.comparePassword(password, data.password);
      if (!validPassword) throw new Error('Invalid credentials');
      
      const token = auth.generateToken(data);
      return { token, user: { id: data.id, username: data.username, email: data.email } };
    },

    // Add a new user
    addUser: async (_, { username, email, password }) => {
      const hashedPassword = await auth.hashPassword(password);
      const { data, error } = await supabase.from('users').insert([{ username, email, password: hashedPassword }]).select('*').single();

      if (error) throw new Error(error.message);
      return data;
    },

    // Update user details (protected)
    updateUser: async (_, { id, username, email }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const { data, error } = await supabase.from('users').update({ username, email }).eq('id', id).single();
      if (error) throw new Error(error.message);
      return data;
    },

    // Delete a user (protected, role-based access control)
    deleteUser: async (_, { id }, context) => {
      if (!context.user || context.user.role !== 'admin') throw new Error('Forbidden');
      const { data, error } = await supabase.from('users').delete().eq('id', id).single();
      if (error) throw new Error(error.message);
      return data;
    },

    // Add a new property (protected)
    addProperty: async (_, { name, location, price, description, property_type, user_id }, context) => {
      if (!context.user) throw new Error('Unauthorized');

      const { data: userExists, error: userError } = await supabase.from('users').select('id').eq('id', user_id).single();
      if (userError || !userExists) throw new Error('Invalid user_id: User does not exist');

      const { data, error } = await supabase.from('properties').insert([{ name, location, price, description, property_type, user_id }]).select('*').single();
      if (error) throw new Error(error.message);
      return data;
    },

    // Update property details (protected)
    updateProperty: async (_, { id, name, location, price, description, property_type }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const { data, error } = await supabase.from('properties').update({ name, location, price, description, property_type }).eq('id', id).single();
      if (error) throw new Error(error.message);
      return data;
    },

    // Delete a property (protected)
    deleteProperty: async (_, { id }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const { data, error } = await supabase.from('properties').delete().eq('id', id).single();
      if (error) throw new Error(error.message);
      return data;
    },

    // FAVORITES AND WISHLISTS RESOLVERS

    addFavorite: async (_, { user_id, property_id }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const { data, error } = await supabase.from('favorites').insert([{ user_id, property_id }]);
      if (error) throw new Error(error.message);
      return data;
    },

    removeFavorite: async (_, { user_id, property_id }, context) => {
      if (!context.user) throw new Error('Unauthorized');
      const { data, error } = await supabase.from('favorites').delete().eq('user_id', user_id).eq('property_id', property_id);
      if (error) throw new Error(error.message);
      return data;
    }
  }
};

module.exports = resolvers;
