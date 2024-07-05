// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tpeqefgjvhmpmngmjvhg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwZXFlZmdqdmhtcG1uZ21qdmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkxMjQ2MTgsImV4cCI6MjAzNDcwMDYxOH0.1QH8oyzrkRkidusb6dQ8ojs1h89mNLx5DrvI0ELp_Xg";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
