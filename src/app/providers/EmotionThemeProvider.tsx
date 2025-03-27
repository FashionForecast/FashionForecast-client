import { ThemeProvider } from '@emotion/react';
import { PropsWithChildren } from 'react';

import { theme } from '@/shared/styles';

/** @link https://emotion.sh/docs/theming */
export const EmotionThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
