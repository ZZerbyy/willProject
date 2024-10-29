const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const root = {
  hello: () => 'Hello world!',
  properties: async () => {
    const { data, error } = await supabase.from('properties').select('*');
    if (error) throw new Error(error.message);
    return data;
  }
};

module.exports = root;
