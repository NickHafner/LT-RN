// In theme
import palette from './palette';
import { createTheme } from '@shopify/restyle';

const theme = createTheme({
  colors: {
    body: palette.grey100,
    placeHolder: palette.white70,
    backgroundRegular: palette.white90,
    backgroundSubdued: palette.blue20,
    mainBackground: palette.white90,
    mainForeground: palette.white90,

    foregroundRegular: palette.grey90,
    foregroundOff: palette.grey70,
    foregroundSubdued: palette.grey40,
    foregroundContrasting: palette.white90,
    foregroundSuccess: palette.green80,

    highlightPrimary: palette.yellow70,
    highlightPrimaryDisabled: palette.grey70,

    buttonBackgroundPlain: palette.blue70,
    errorPrimary: palette.red90,

    secondaryCardBackground: palette.grey20,
    secondaryCardText: palette.white90,
    iconBackgroundDark: palette.blue90,
  },
  spacing: {
    none: 0,
    xxs: 4,
    xs: 8,
    s: 16,
    m: 32,
    l: 64,
    xl: 128,
    xxl: 256,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'body',
    },
    subheader: {
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'body',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: 'body',
    },
    defaults: {
      fontSize: 16,
      lineHeight: 24,
      color: 'body',
    },
  },
});

export type Theme = typeof theme;
export default theme;
