// In theme
import palette from './palette';
import { createTheme } from '@shopify/restyle';

const theme = createTheme({
  colors: {
    body: palette.blueGrey100,
    placeHolder: palette.blueGrey90,
    background: palette.blueGrey70,
    paper: palette.blueGrey70,
    backgroundSubdued: palette.blue10,

    highlightPrimary: palette.yellow70,
    buttonBackground: palette.blue70,
    errorPrimary: palette.red70,
    btnPrimary: palette.brandPrimary,
    disabled: palette.grey70,
    inputBackground: palette.blueGrey100,
    border: '#30363d',

    cardBackground: palette.white100,
    secondaryCardText: palette.white90,
    iconColor: palette.white90,
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
  },
});

export type Spacing = typeof theme.spacing;
export type Theme = typeof theme;
export default theme;
