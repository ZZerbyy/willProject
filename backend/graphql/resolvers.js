const supabase = require('../utils/supabaseClient');
const auth = require('../auth');

const root = {
  // LOGIN MUTATION
  login: async ({ email, password }) => {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, email, password')
      .eq('email', email)
      .single();

    if (error || !data) {
      throw new Error('User not found');
    }

    // Verify the password
    const validPassword = await auth.comparePassword(password, data.password);
    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = auth.generateToken(data);
    return { token, user: { id: data.id, username: data.username, email: data.email } };
  },

  // USER RESOLVERS

  // Fetch all users (protected)
  users: async (args, context) => {
    if (!context.user) throw new Error('Unauthorized');
    const { data, error } = await supabase
      .from('users')
      .select('id, username, email, created_at');
    if (error) throw new Error(error.message);
    return data;
  },

  // Fetch a single user by ID (protected)
  userById: async ({ id }, context) => {
    if (!context.user) throw new Error('Unauthorized');
    const { data, error } = await supabase
      .from('users')
      .select('id, username, email, created_at, properties(*)')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  // Add a new user
  addUser: async ({ username, email, password }) => {
    // Hash the password before saving
    const hashedPassword = await auth.hashPassword(password);
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, email, password: hashedPassword }])
      .select('*')
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Update user details (protected)
  updateUser: async ({ id, username, email }, context) => {
    if (!context.user) throw new Error('Unauthorized');
    const { data, error } = await supabase
      .from('users')
      .update({ username, email })
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  // Delete a user (protected, role-based access control)
  deleteUser: async ({ id }, context) => {
    if (!context.user) throw new Error('Unauthorized');
    if (context.user.role !== 'admin') throw new Error('Forbidden');

    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  // PROPERTY RESOLVERS

  // Fetch all properties with optional filters
  properties: async ({ property_type, min_price, max_price }) => {
    let query = supabase.from('properties').select('*');

    // Apply filters if provided
    if (property_type) {
      query = query.eq('property_type', property_type);
    }
    if (min_price !== undefined) {
      query = query.gte('price', min_price);
    }
    if (max_price !== undefined) {
      query = query.lte('price', max_price);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  },

  // Fetch properties by user ID
  propertiesByUser: async ({ user_id }) => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('user_id', user_id);
    if (error) throw new Error(error.message);
    return data;
  },

  // Fetch a single property by ID
  propertyById: async ({ id }) => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  // Add a new property (protected)
  addProperty: async ({ name, location, price, description, property_type, user_id }, context) => {
    if (!context.user) throw new Error('Unauthorized');

    // Check if the user_id exists in the users table
    const { data: userExists, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', user_id)
      .single();

    if (userError || !userExists) {
      throw new Error('Invalid user_id: User does not exist');
    }

    // If user exists, proceed to insert the property
    const { data, error } = await supabase
      .from('properties')
      .insert([{ name, location, price, description, property_type, user_id }])
      .select('*') // Make sure to select and return the inserted data
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Update property details (protected)
  updateProperty: async ({ id, name, location, price, description, property_type }, context) => {
    if (!context.user) throw new Error('Unauthorized');
    const { data, error } = await supabase
      .from('properties')
      .update({ name, location, price, description, property_type })
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  // Delete a property (protected)
  deleteProperty: async ({ id }, context) => {
    if (!context.user) throw new Error('Unauthorized');
    const { data, error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  // FAVORITES AND WISHLISTS RESOLVERS

  addFavorite: async ({ user_id, property_id }, context) => {
    if (!context.user) throw new Error('Unauthorized');
    const { data, error } = await supabase
      .from('favorites')
      .insert([{ user_id, property_id }]);
    if (error) throw new Error(error.message);
    return data;
  },

  removeFavorite: async ({ user_id, property_id }, context) => {
    if (!context.user) throw new Error('Unauthorized');
    const { data, error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user_id)
      .eq('property_id', property_id);
    if (error) throw new Error(error.message);
    return data;
  },
};

module.exports = root;
