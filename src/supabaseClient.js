// src/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

// Load environment variables (Vite uses import.meta.env, CRA uses process.env)
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL or Anon Key is missing in environment variables!"
  );
}

// Initialize the Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
