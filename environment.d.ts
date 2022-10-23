declare namespace NodeJS {
  interface ProcessEnv {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    ENV: 'development' | 'production';
    IS_TESTING: 'true' | 'false';
    ENABLE_DEV_MODE: '0' | '1';
    LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
    LOG_DEBUG: string;
  }
}
