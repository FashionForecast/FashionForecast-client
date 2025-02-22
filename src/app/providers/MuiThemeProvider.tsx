import { createTheme, ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';

import { theme as emotionTheme } from '@/shared/styles';

/** @link https://mui.com/material-ui/customization/palette/ */
const theme = createTheme({
  typography: {
    fontFamily:
      "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
  },
  palette: {
    primary: {
      main: emotionTheme.colors.primary.main,
      dark: emotionTheme.colors.primary.dark,
      light: emotionTheme.colors.primary.light,
    },
    secondary: {
      main: emotionTheme.colors.secondary.main,
      dark: emotionTheme.colors.secondary.dark,
    },
    error: {
      main: emotionTheme.colors.error.main,
      dark: emotionTheme.colors.error.dark,
      light: emotionTheme.colors.error.light,
    },
    warning: {
      main: emotionTheme.colors.warning.main,
      dark: emotionTheme.colors.warning.dark,
      light: emotionTheme.colors.warning.light,
    },
    info: {
      main: emotionTheme.colors.info.main,
      dark: emotionTheme.colors.info.dark,
      light: emotionTheme.colors.info.light,
    },
    success: {
      main: emotionTheme.colors.success.main,
      dark: emotionTheme.colors.success.dark,
      light: emotionTheme.colors.success.light,
    },
  },
});

export const MuiThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
