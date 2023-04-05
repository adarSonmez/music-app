import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        // by default manifest is not generated on dev server (for performance reasons) - set to true to enable
        enabled: true
      },
      manifest: {
        name: 'Music Application',
        short_name: 'Music App',
        icons: [
          {
            src: '/assets/icons/48x48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: '/assets/icons/96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/assets/icons/192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/assets/icons/512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        description: 'Upload your music and listen to it anywhere',
        orientation: 'portrait',
        categories: ['music', 'audio', 'media']
        // screenshots: []
        // shortcuts: []
      },
      workbox: {
        // first cache then network strategy (opposite of firebase sdk)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}']
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  }
})
