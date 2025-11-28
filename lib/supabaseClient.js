import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://hsnzyklpftymqgzkpxua.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhzbnp5a2xwZnR5bXFnemtweHVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMjI2MTYsImV4cCI6MjA3OTg5ODYxNn0.vS8PM-WoXAAhjtJd8_HWH9ybeg5IRBW3w3z9A0t50Ws"
);
