import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/normalize.css';
import './styles/reset.css';
import './styles/font.css';
import 'keen-slider/keen-slider.min.css';
import { Providers } from './providers/index.ts';
import { AppRouter } from './routers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <AppRouter />
    </Providers>
  </StrictMode>
);
