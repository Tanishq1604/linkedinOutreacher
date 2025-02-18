import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase URL and Anon Key are required. Using mock data for development.",
  );
}

export const supabase = createClient(
  supabaseUrl || "https://your-project.supabase.co",
  supabaseAnonKey || "your-anon-key",
);

// Mock data functions for development
export const mockSupabase = {
  from: (table: string) => ({
    select: () => ({
      single: () => Promise.resolve({ data: null, error: null }),
      eq: () => Promise.resolve({ data: [], error: null }),
    }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
  }),
  channel: (name: string) => ({
    on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
  }),
};

// Export the appropriate client based on environment
export const db = supabaseUrl && supabaseAnonKey ? supabase : mockSupabase;
