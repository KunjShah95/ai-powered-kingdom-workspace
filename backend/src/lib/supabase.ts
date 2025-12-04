import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''; // Use Service Role Key for backend admin tasks

if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase URL or Key is missing. Auth middleware might fail.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
