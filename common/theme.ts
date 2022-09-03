// In theme
import palette from './palette';
import { createTheme } from '@shopify/restyle';

const theme = createTheme({
  colors: {
    body: palette.black,
    backgroundRegular: palette.white,
    backgroundSubdued: palette.skyLighter,
    mainBackground: palette.white,
    mainForeground: palette.white,

    foregroundRegular: palette.black,
    foregroundOff: palette.inkLight,
    foregroundSubdued: palette.inkLightest,
    foregroundContrasting: palette.white,
    foregroundSuccess: palette.greenDark,

    highlightPrimary: palette.indigo,
    highlightPrimaryDisabled: palette.indigoLight,

    buttonBackgroundPlain: palette.sky,
    errorPrimary: palette.red,

    secondaryCardBackground: palette.grey,
    secondaryCardText: palette.white,
    iconBackgroundDark: palette.blueDarker,
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
