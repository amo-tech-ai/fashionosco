
interface ImportMetaEnv {
  readonly VITE_SUPABASE_FUNCTION_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SUPABASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'react-router-dom';
declare module 'jspdf';
declare module 'jspdf-autotable';
