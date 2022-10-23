declare module '@env' {
  export const SUPABASE_URL: string;
  export const SUPABASE_ANON_KEY: string;
  export const ENV: 'development' | 'production';
  export const IS_TEST: '0' | '1';
  export const IS_DEV: '0' | '1';
  export const LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
  export const LOG_DEBUG: string;
}
