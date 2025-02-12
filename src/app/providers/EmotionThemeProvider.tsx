import { theme } from '@/shared/styles';
import { ThemeProvider } from '@emotion/react';
import { PropsWithChildren } from 'react';

/** @link https://emotion.sh/docs/theming */
export const EmotionThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
