import { ThemeProvider } from '@shopify/restyle';
import { Theme, DarkTheme } from '@mlt/styles';
import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
});
const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [themeMode, setThemeMode] = useState('false');
  const handleTheme = () => setThemeMode(themeMode !== 'dark' ? 'light' : 'dark');

  useEffect(() => {
    async function prepare() {
      try {
        const mode = AsyncStorage.getItem('theme');
        const data = await Promise.all([mode])
        setThemeMode(data[0] || 'light');
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  return (
    <ThemeProvider theme={themeMode !== 'dark' ? DarkTheme : Theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} handleThemeChange={handleTheme} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
