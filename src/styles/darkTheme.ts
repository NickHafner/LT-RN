import theme, { Theme } from './theme';
import palette from './palette';

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    body: palette.blueGrey10,
    placeHolder: palette.blueGrey30,
    background: '#282b30',
    backgroundSubdued: '#1e2124',
    iconColor: palette.brandPrimary,
    btnPrimary: palette.grey20,
  },
};

export default darkTheme;