import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
import prerender from '@prerenderer/rollup-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    prerender({
      routes: ['/', '/search', '/login', '/feedback'],
      renderer: '@prerenderer/renderer-puppeteer',
      server: {
        port: 3000,
        host: 'localhost',
      },
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 500,
      },
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/http:/i, 'https:')
          .replace(/(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i, 'ootc.life');
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
  server: {
    proxy: {
      '/oauth2': {
        target: 'http://localhost:8080',
      },
      '/api': {
        target: 'http://localhost:8080',
      },
    },
  },
});
