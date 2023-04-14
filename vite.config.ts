import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'android-chrome-192x192.png',
        'android-chrome-512x512.png',
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg',
      ],
      manifest: {
        name: 'Golf Tracker',
        short_name: 'Golf Tracker',
        description: 'Track your golf scorecards',
        theme_color: "#141517",
        background_color: "#141517",
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    }),
  ],
});
