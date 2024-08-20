import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';

/**
 * Emotion Theming
 * @link https://emotion.sh/docs/theming
 */

type EmotionThemeProviderProps = {
  children: React.ReactNode;
};

const EmotionThemeProvider = ({ children }: EmotionThemeProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default EmotionThemeProvider;
