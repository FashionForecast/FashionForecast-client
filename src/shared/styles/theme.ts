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
      dark: colors.blueGrey['700'],
    },
    primaryState: {
      hover: colors.blueGrey['A04'],
    },
    elevation: {
      outlined: colors.blueGrey['300'],
    },
    error: {
      main: colors.red[600],
    },
    action: {
      active: colors.blueGrey['A56'],
      hover: colors.blueGrey['A04'],
      selected: colors.blueGrey['A08'],
      focus: colors.blueGrey['A12'],
      disabled: colors.blueGrey['A38'],
      disabledBackground: colors.blueGrey['A12'],
    },
    blueGrey: colors.blueGrey,
    red: colors.red,
    amber: colors.amber,
    orange: colors.orange,
    blue: colors.blue,
    green: colors.green,
    teal: colors.teal,
    white: colors.white,
  },
  typo,
};

export type AppTheme = typeof theme;
