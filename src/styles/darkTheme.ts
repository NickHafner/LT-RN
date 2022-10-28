import theme, { Theme } from './theme';
import palette from './palette';

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    body: palette.blueGrey10,
    placeHolder: palette.blueGrey30,
    background: '#0d1117',
    paper: '#282b30',
    backgroundSubdued: '#30363d',
    iconColor: palette.telegram300,
    inputBackground: '#0d1117',
    brandPrimary: palette.telegram300,
  },
};

export default darkTheme;