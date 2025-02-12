import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/normalize.css';
import './styles/reset.css';
import './styles/font.css';
import 'keen-slider/keen-slider.min.css';
import { Providers } from './providers/index.ts';
import { AppRouter } from './routers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <AppRouter />
    </Providers>
  </React.StrictMode>
);
