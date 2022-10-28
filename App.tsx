import { ThemeProvider } from '@shopify/restyle';
import { Theme, DarkTheme, ThemeModeContext } from '@/styles';
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import monitorNetwork from '@/debugging/network';
import { SHOW_NETWORK } from '@env';
import { AppRegistry } from 'react-native';
import { supabase } from '@/lib/supabase';
import { SupaSessionContext } from '@/lib/supaSession';
import { Session } from '@supabase/supabase-js';
import Navigation from '@/navigation';
import { StatusBar } from 'expo-status-bar';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
});

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  
  useEffect(() => {
    async function prepare() {
      try {
        const mode = AsyncStorage.getItem('theme');
        const data = await Promise.all([mode])
        setTheme(data[0] === 'light' ? 'light' : 'dark');
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (SHOW_NETWORK === '0') monitorNetwork(true, true);

  return (
    <ThemeProvider theme={theme === 'light' ? Theme : DarkTheme}>
      <QueryClientProvider client={queryClient}>
        <SupaSessionContext.Provider value={session}>
          <ThemeModeContext.Provider value={{ theme, setTheme }}>
            <StatusBar animated style={theme === 'light' ? 'dark' : 'light'} />
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </ThemeModeContext.Provider>
        </SupaSessionContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

AppRegistry.registerComponent('MLT', () => App);