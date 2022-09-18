import theme, { Theme } from './theme';
import palette from './palette';

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.white10,
    mainForeground: palette.white40,
    body: palette.white90,
    backgroundRegular: palette.grey90,
    backgroundSubdued: palette.blue80,

    secondaryCardBackground: palette.grey30,
    secondaryCardText: palette.white10,
  },
};

export default darkTheme;