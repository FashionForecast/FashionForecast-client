import { PropsWithChildren, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ReduxProvider } from './ReduxProvider';
import { TanstackQueryProvider } from './TanstackQueryProvider';
import { SnackbarProvider } from './SnackbarProvider';
import PageLoading from '@/layout/PageLoading/PageLoading';
import { MuiThemeProvider } from './MuiThemeProvider';
import { EmotionThemeProvider } from './EmotionThemeProvider';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <HelmetProvider>
      <MuiThemeProvider>
        <EmotionThemeProvider>
          <ReduxProvider>
            <TanstackQueryProvider>
              <SnackbarProvider>
                <Suspense fallback={<PageLoading />}>{children}</Suspense>
              </SnackbarProvider>
            </TanstackQueryProvider>
          </ReduxProvider>
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </HelmetProvider>
  );
};
