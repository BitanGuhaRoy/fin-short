import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fcjsanwwbgtolgdgycdh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjanNhbnd3Ymd0b2xnZGd5Y2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMjI3MTcsImV4cCI6MjA2NDg5ODcxN30.2beVO0xi6mAYV39F09nHLazvGqe-EGi7AmDIsnNUouY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
