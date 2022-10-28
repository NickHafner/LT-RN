export { default as Box } from './components/Box';
export { default as Text } from './components/Text';
export { default as Input } from './components/Input';
export { default as Button } from './components/Button';
export { default as useTheme } from './useTheme';
export { Theme as ThemeType } from './theme';
export { default as Theme } from './theme';
export { default as DarkTheme } from './darkTheme';
import { createContext } from 'react';

export const ThemeModeContext = createContext<{ theme: string; setTheme: (mode: string) => void }>({
  theme: 'dark',
  setTheme: (mode: string) => {},
});