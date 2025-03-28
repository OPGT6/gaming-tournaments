import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uclokpcfaulptrtysvho.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjbG9rcGNmYXVscHRydHlzdmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMjI4MjYsImV4cCI6MjA1ODY5ODgyNn0.K0HtGPQtdzPqZeTUPAsv3Oa4cYM5uQfpbhLOzDAFPMk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);