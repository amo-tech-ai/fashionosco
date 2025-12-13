
// Removed reference to 'vite/client' as it was causing type resolution errors.
// Ensure needed types are defined below.

interface ImportMetaEnv {
  readonly VITE_SUPABASE_FUNCTION_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SUPABASE_URL: string
  // Add other env variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'react-router-dom';
declare module 'jspdf';
declare module 'jspdf-autotable';
