import { colors } from './colors';

export const theme = {
  colors: {
    text: {
      primary: colors.blueGrey['A87'],
      secondary: colors.blueGrey['A60'],
    },
    info: {
      main: colors.blue['600'],
    },
    blueGrey: colors.blueGrey,
    red: colors.red,
    orange: colors.orange,
    blue: colors.blue,
    green: colors.green,
    white: colors.white,
  },
};

export type ThemeType = typeof theme;
