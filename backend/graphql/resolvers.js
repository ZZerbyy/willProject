const supabase = require('../utils/supabaseClient');
const auth = require('../auth');
const uploadImage = async (file, propertyId) => {
  // Set the file path within the bucket
  const filePath = `${propertyId}/${file.originalname}`;
  
  // Upload the file to Supabase storage
  const { data, error } = await supabase.storage
    .from('property-images')
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) throw new Error(error.message);

  // Generate a public URL for the image (optional)
  const { publicUrl } = supabase.storage.from('property-images').getPublicUrl(filePath);

  return publicUrl; // or return `filePath` if you want to store just the path
};

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
    // Fetch all properties with optional filters and associated images
properties: async (_, { property_type, min_price, max_price }) => {
  let query = supabase.from('properties').select(`
    *,
    property_images(image_url)
  `);

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
    // Fetch a single property by ID with associated images
propertyById: async (_, { id }) => {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      property_images(image_url)
    `)
    .eq('id', id)
    .single();

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
    // Add a new property with images
    addProperty: async (_, { name, location, price, description, property_type, user_id, images }, context) => {
      if (!context.user) throw new Error('Unauthorized');

      // Insert property data
      const { data: property, error: propertyError } = await supabase.from('properties').insert([{ name, location, price, description, property_type, user_id }]).single();
      if (propertyError) throw new Error(propertyError.message);

      // Upload images if provided
      if (images && images.length > 0) {
        const uploadedImages = [];
        for (const image of images) {
          const publicUrl = await uploadImage(image, property.id);
          uploadedImages.push({ property_id: property.id, image_url: publicUrl });
        }

        // Insert image URLs into the property_images table
        const { error: imageError } = await supabase.from('property_images').insert(uploadedImages);
        if (imageError) throw new Error(imageError.message);
      }

      return property;
    },


    // Update property details (protected)
    // Update property details and images
updateProperty: async (_, { id, name, location, price, description, property_type, images }, context) => {
  if (!context.user) throw new Error('Unauthorized');

  // Update property details
  const { data: property, error: propertyError } = await supabase.from('properties').update({ name, location, price, description, property_type }).eq('id', id).single();
  if (propertyError) throw new Error(propertyError.message);

  // If new images are provided, replace old images
  if (images && images.length > 0) {
    // Delete existing images for the property
    await supabase.from('property_images').delete().eq('property_id', id);

    // Insert new images
    const imageRecords = images.map(url => ({ property_id: id, image_url: url }));
    const { error: imageError } = await supabase.from('property_images').insert(imageRecords);
    if (imageError) throw new Error(imageError.message);
  }

  return property;
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
