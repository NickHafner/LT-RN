import theme, { Theme } from './theme';
import palette from './palette';

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    body: palette.blueGrey10,
    placeHolder: palette.blueGrey30,
    background: '#282b30',
    paper: palette.blueGrey90,
    backgroundSubdued: '#1e2124',
    iconColor: palette.brandPrimary,
    inputBackground: palette.blueGrey100,
    btnPrimary: palette.brandPrimary,
    border: '#30363d',
  },
};

export default darkTheme;