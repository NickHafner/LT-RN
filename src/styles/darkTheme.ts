import theme, { Theme } from './theme';
import palette from './palette';

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    body: palette.blueGrey10,
    placeHolder: palette.blueGrey30,
    background: palette.blueGrey80,
    backgroundSubdued: palette.blue60,
    iconColor: palette.blueGrey30,
  },
};

export default darkTheme;