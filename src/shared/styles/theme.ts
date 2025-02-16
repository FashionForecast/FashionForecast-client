import { colors } from './colors';
import { typo } from './typo';

export const theme = {
  colors: {
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey['A60'],
      disabled: colors.blueGrey['A38'],
      hover: colors.blueGrey['A04'],
      selected: colors.blueGrey['A08'],
      focus: colors.blueGrey.A12,
      focusVisible: colors.blueGrey.A30,
      outlinedBorder: colors.blueGrey.A50,
    },
    primary: {
      main: colors.blueGrey[600],
      dark: colors.blueGrey[700],
      light: colors.blueGrey[300],
    },
    primaryState: {
      hover: colors.blueGrey['A04'],
      selected: colors.blueGrey.A08,
      focus: colors.blueGrey.A12,
      focusVisible: colors.blueGrey.A30,
      outlineBorder: colors.blueGrey.A50,
    },
    action: {
      active: colors.blueGrey['A56'],
      hover: colors.blueGrey['A04'],
      selected: colors.blueGrey['A08'],
      focus: colors.blueGrey['A12'],
      disabled: colors.blueGrey['A38'],
      disabledBackground: colors.blueGrey['A12'],
    },
    error: {
      main: colors.red[600],
      dark: colors.red[700],
      light: colors.red[300],
      hover: colors.red.A04,
      selected: colors.red.A08,
      focusVisible: colors.red.A30,
      outlinedBorder: colors.red.A50,
    },
    warning: {
      main: colors.orange[600],
      dark: colors.orange[700],
      light: colors.orange[300],
      contrast: colors.white,
    },
    info: {
      main: colors.blue['600'],
      dark: colors.blue[700],
      light: colors.blue[300],
      contrast: colors.white,
    },
    success: {
      main: colors.green[600],
      dark: colors.green[700],
      light: colors.green[300],
      contrast: colors.white,
    },
    secondary: {
      main: colors.blueGrey[200],
      dark: colors.blueGrey[900],
    },
    elevation: {
      outlined: colors.blueGrey['300'],
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
