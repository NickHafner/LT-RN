import { Session } from '@supabase/supabase-js';
import { createContext } from 'react';
export const SupaSessionContext = createContext<null | Session>(null);