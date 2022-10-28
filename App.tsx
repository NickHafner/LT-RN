import { ThemeProvider } from '@shopify/restyle';
import { Theme, DarkTheme, ThemeModeContext } from '@/styles';
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import monitorNetwork from '@/debugging/network';
import { SHOW_NETWORK } from '@env';
import { AppRegistry } from 'react-native';
import { supabase } from '@/lib/supabase';
import { SupaSessionContext } from '@/lib/supaSession';
import { Session } from '@supabase/supabase-js';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
});
const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [theme, setTheme] = useState<string>('dark');
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
        setTheme(data[0] || 'dark');
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
        <ThemeModeContext.Provider value={{theme, setTheme}}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
              <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeModeContext.Provider>
        </SupaSessionContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

AppRegistry.registerComponent('MLT', () => App);