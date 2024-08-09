import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';
import TanstackQueryProvider from './contexts/TanstackQueryProvider.tsx';
import ReduxProvider from './contexts/ReduxProvider.tsx';
import './styles/normalize.css';
import './styles/reset.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider>
      <TanstackQueryProvider>
        <RouterProvider router={router} />
      </TanstackQueryProvider>
    </ReduxProvider>
  </React.StrictMode>
);
