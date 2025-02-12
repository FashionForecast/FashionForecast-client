import { createTheme, ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';

/** @link https://mui.com/material-ui/customization/theming/ */
const theme = createTheme({
  typography: {
    fontFamily:
      "'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
  },
});

export const MuiThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
