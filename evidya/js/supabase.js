import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const supabaseUrl = "https://nwizaufhlnsbzjhhxmeu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXphdWZobG5zYnpqaGh4bWV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNzMyNjUsImV4cCI6MjA5NTY0OTI2NX0.ACA17cDbssY1db_Jp_N7WQ1-YEDipeUed7lPaea7ym4";

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
export { supabaseClient };