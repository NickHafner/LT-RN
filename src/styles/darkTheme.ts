import theme, { Theme } from './theme';
import palette from './palette';

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    mainForeground: palette.white,
    body: palette.white,
    backgroundRegular: palette.black,
    backgroundSubdued: palette.blueDarker,

    secondaryCardBackground: palette.grey,
    secondaryCardText: palette.white,
  },
};

export default darkTheme;