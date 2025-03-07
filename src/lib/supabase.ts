import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Get environment variables with fallbacks to prevent errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create the Supabase client with more robust error handling
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: (...args) => fetch(...args),
  },
});

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

// Helper function to test the Supabase connection
export const testSupabaseConnection = async () => {
  try {
    // First check if we have the required environment variables
    if (!isSupabaseConfigured()) {
      console.error('Supabase not configured: Missing environment variables');
      return { 
        success: false, 
        message: 'Supabase not configured: Missing environment variables' 
      };
    }

    // Try a simple query that doesn't use aggregate functions
    const { data, error } = await supabase
      .from('products')
      .select('_id')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection test failed with error:', error);
      throw error;
    }

    return { 
      success: true, 
      message: 'Connected to Supabase successfully',
      data
    };
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return { 
      success: false, 
      message: 'Failed to connect to Supabase', 
      error 
    };
  }
};