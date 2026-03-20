import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  optimizeDeps: {
    exclude: ['tesseract.js'],
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png', 'favicon.ico'],
      manifest: {
        name: 'EuroCollector',
        short_name: 'EuroCollector',
        description: 'Tu colección de monedas conmemorativas de 2€',
        theme_color: '#1e40af',
        background_color: '#1e40af',
        display: 'standalone',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        // Cachea el app shell (JS, CSS, HTML)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],

        // Estrategia para imágenes del CDN — cache first, 30 días
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/euro-collector-images\.sergio-araque-97\.workers\.dev\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-images',
              expiration: {
                maxEntries: 400,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Estrategia para Supabase Storage (fallback)
          {
            urlPattern: /^https:\/\/idoiwlaxghwdbamkhftu\.supabase\.co\/storage\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'supabase-images',
              expiration: {
                maxEntries: 400,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Estrategia para las APIs de Supabase — network first, fallback a caché
          {
            urlPattern: /^https:\/\/idoiwlaxghwdbamkhftu\.supabase\.co\/rest\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 1 día
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // GeoJSON del mapa — cache first, apenas cambia
          {
            urlPattern: /^https:\/\/raw\.githubusercontent\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'geojson',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 días
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
})