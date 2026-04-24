import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos que reflejarán tu schema en Supabase
export interface DestinationRow {
  id: string;
  name: string;
  country: string;
  image_url: string;
  price_from: number;
  description: string;
  badge: string | null;
  created_at: string;
}
