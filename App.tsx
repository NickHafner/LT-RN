import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@shopify/restyle';
import theme from './common/theme';
import darkTheme from './common/darkTheme';
import Box from './common/Box';
import Text from './common/Text';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        backgroundColor="mainBackground"
        flex={1}
        paddingVertical="xl"
        justifyContent="center"
        paddingHorizontal="xs">
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </Box>
    </ThemeProvider>
  );
}
