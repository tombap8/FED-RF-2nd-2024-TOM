import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nlegrbpntvxqqbugkfrb.supabase.co"; // Supabase 대시보드에서 복사한 URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZWdyYnBudHZ4cXFidWdrZnJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NzkzNjksImV4cCI6MjA1OTE1NTM2OX0.5H7qROZ8B9YZx7W6eDuRU4KVgs-31G5PXDW8oTqbdCA"; // Supabase 대시보드에서 복사한 API Key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
