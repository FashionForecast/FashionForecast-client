import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), svgr()],
//   resolve: {
//     alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
//   },
//   server: {
//     proxy: {
//       // '/oauth2': {
//       //   target: 'http://localhost:8080',
//       // },
//       '/api': {
//         target: 'http://localhost:8080',
//       },
//     },
//   },
// });

// ----------------------------
const defaultConfig = {
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
};

export default defineConfig(({ command }) => {
  if (command === 'build') {
    // const isDev = mode === 'development';

    return {
      ...defaultConfig,
      server: {
        proxy: {
          '/api': {
            target: 'http://3.35.213.93:8080',
          },
        },
      },
    };
  } else {
    return {
      ...defaultConfig,
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:8080',
          },
        },
      },
    };
  }
});
