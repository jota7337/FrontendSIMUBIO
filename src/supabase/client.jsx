import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Cambia a import.meta.env
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Cambia a import.meta.env

export const supabase = createClient(supabaseUrl, supabaseKey);