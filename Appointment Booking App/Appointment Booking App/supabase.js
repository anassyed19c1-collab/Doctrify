const supabaseURL = 'https://nphgniykfghsxbcrdalz.supabase.co';
const supabase_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5waGduaXlrZmdoc3hiY3JkYWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NzUwMjQsImV4cCI6MjA3NzU1MTAyNH0.qxtjbZBBP2VUsxkKeCJ4V7lZvyORFa_qvLppzn7KKPY';


export const supabaseAPI = supabase.createClient(supabaseURL, supabase_ANON_KEY);


// console.log(supabase);