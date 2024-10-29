const supabase = require('../supabaseClient');
const auth = require('../auth'); // Import the authentication utilities

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

  // Delete a user (protected)
  deleteUser: async ({ id }, context) => {
    if (!context.user) throw new Error('Unauthorized');
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  // PROPERTY RESOLVERS

  // Fetch all properties
  properties: async () => {
    const { data, error } = await supabase.from('properties').select('*');
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
  addProperty: async ({ name, location, price, description, user_id }, context) => {
    if (!context.user) throw new Error('Unauthorized');
    const { data, error } = await supabase
      .from('properties')
      .insert([{ name, location, price, description, user_id }])
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  // Update property details (protected)
  updateProperty: async ({ id, name, location, price, description }, context) => {
    if (!context.user) throw new Error('Unauthorized');
    const { data, error } = await supabase
      .from('properties')
      .update({ name, location, price, description })
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
};

module.exports = root;
