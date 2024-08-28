import { colors } from './colors';
import { typo } from './typo';

export const theme = {
  colors: {
    text: {
      primary: colors.blueGrey['A87'],
      secondary: colors.blueGrey['A60'],
      disabled: colors.blueGrey['A38'],
    },
    info: {
      main: colors.blue['600'],
    },
    primary: {
      main: colors.blueGrey['600'],
    },
    primaryState: {
      hover: colors.blueGrey['A04'],
    },
    blueGrey: colors.blueGrey,
    red: colors.red,
    orange: colors.orange,
    blue: colors.blue,
    green: colors.green,
    white: colors.white,
  },
  typo,
};

export type ThemeType = typeof theme;
