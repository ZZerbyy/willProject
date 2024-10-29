const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const root = {
  users: async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw new Error(error.message);
    return data;
  },
  properties: async () => {
    const { data, error } = await supabase.from('properties').select('*');
    if (error) throw new Error(error.message);
    return data;
  },
  propertyById: async ({ id }) => {
    const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data;
  }
};

module.exports = root;
