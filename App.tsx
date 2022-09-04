import { ThemeProvider } from '@shopify/restyle';
import theme from './styles/theme';
import darkTheme from './styles/darkTheme';
import Box from './styles/Box';
import Text from './styles/Text';
import { useEffect, useCallback, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Button } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [themeMode, setThemeMode] = useState('false');

  useEffect(() => {
    async function prepare() {
      try {
        const mode = await AsyncStorage.getItem('theme') || 'light';
        setThemeMode(mode)
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={themeMode === 'dark' ? darkTheme : theme}>
      <QueryClientProvider client={queryClient}>
        <Box
          backgroundColor="mainBackground"
          flex={1}
          paddingVertical="xl"
          justifyContent="center"
          paddingHorizontal="xs"
          onLayout={onLayoutRootView}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <Button
            onPress={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            title="Button"
          />
        </Box>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
