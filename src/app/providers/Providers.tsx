import { PropsWithChildren, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { PageFallback } from '@/widgets/PageFallback';

import { EmotionThemeProvider } from './EmotionThemeProvider';
import { MuiThemeProvider } from './MuiThemeProvider';
import { ReduxProvider } from './ReduxProvider';
import { SnackbarProvider } from './SnackbarProvider';
import { TanstackQueryProvider } from './TanstackQueryProvider';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <HelmetProvider>
      <MuiThemeProvider>
        <EmotionThemeProvider>
          <ReduxProvider>
            <TanstackQueryProvider>
              <SnackbarProvider>
                <Suspense fallback={<PageFallback />}>{children}</Suspense>
              </SnackbarProvider>
            </TanstackQueryProvider>
          </ReduxProvider>
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </HelmetProvider>
  );
};
