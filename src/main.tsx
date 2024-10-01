import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';
import TanstackQueryProvider from './contexts/TanstackQueryProvider.tsx';
import ReduxProvider from './contexts/ReduxProvider.tsx';
import './styles/normalize.css';
import './styles/reset.css';
import './styles/font.css';
import MuiThemeProvider from './contexts/MuiThemeProvider.tsx';
import EmotionThemeProvider from './contexts/EmotionThemeProvider.tsx';
import { SnackbarProvider } from './contexts/SnackbarProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MuiThemeProvider>
      <EmotionThemeProvider>
        <ReduxProvider>
          <TanstackQueryProvider>
            <SnackbarProvider>
              <RouterProvider router={router} />
            </SnackbarProvider>
          </TanstackQueryProvider>
        </ReduxProvider>
      </EmotionThemeProvider>
    </MuiThemeProvider>
  </React.StrictMode>
);
