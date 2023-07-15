import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const packageJson = require('./package.json')

process.env.VITE_APP_VERSION = packageJson.version

// // https://vitejs.dev/config/
export default ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()))

  // check api mocks
  const USE_MOCK = process.env.VITE_APP_USE_MOCK === 'true'
  console.log('[atum] Using mock: ' + USE_MOCK)

  // defined config
  return defineConfig({
    define: {
      'process.env': process.env
    },
    plugins: [
      vue()
      // pwa({
      //   mode: 'development',
      //   registerType: 'autoUpdate',
      //   manifest: {
      //     name: process.env.VITE_APP_NAME,
      //     short_name: process.env.VITE_APP_SHORT_NAME,
      //     start_url: '/',
      //     display: 'standalone',
      //     theme_color: process.env.VITE_APP_THEME_COLOR,
      //     background_color: '#ffffff',
      //     description: process.env.VITE_APP_NAME,
      //     scope: '/',
      //     icons: [
      //       {
      //         src: '/icons/icon-72x72.png',
      //         sizes: '72x72',
      //         type: 'image/png'
      //       },
      //       {
      //         src: '/icons/icon-96x96.png',
      //         sizes: '96x96',
      //         type: 'image/png'
      //       },
      //       {
      //         src: '/icons/icon-128x128.png',
      //         sizes: '128x128',
      //         type: 'image/png'
      //       },
      //       {
      //         src: '/icons/icon-144x144.png',
      //         sizes: '144x144',
      //         type: 'image/png'
      //       },
      //       {
      //         src: '/icons/icon-152x152.png',
      //         sizes: '152x152',
      //         type: 'image/png'
      //       },
      //       {
      //         src: '/icons/icon-192x192.png',
      //         sizes: '192x192',
      //         type: 'image/png'
      //       },
      //       {
      //         src: '/icons/icon-384x384.png',
      //         sizes: '384x384',
      //         type: 'image/png'
      //       },
      //       {
      //         src: '/icons/icon-512x512.png',
      //         sizes: '512x512',
      //         type: 'image/png'
      //       }
      //     ]
      //   },
      //   workbox: {
      //     runtimeCaching: [
      //       // {
      //       //   urlPattern: /^https:\/\/cms\.ferroli\.co\.id\/api\/.*/i,
      //       //   handler: 'StaleWhileRevalidate',
      //       //   options: {
      //       //     cacheName: 'vite-api-cache',
      //       //     expiration: {
      //       //       maxEntries: 10,
      //       //       maxAgeSeconds: 60 * 60 * 24 * 7 // <== 7 days
      //       //       // maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
      //       //     },
      //       //     cacheableResponse: {
      //       //       statuses: [0, 200]
      //       //     }
      //       //   }
      //       // },
      //       {
      //         urlPattern: /^https:\/\/ik\.imagekit\.io\/.*/i,
      //         handler: 'StaleWhileRevalidate',
      //         options: {
      //           cacheName: 'vite-imagekit-cache',
      //           expiration: {
      //             maxEntries: 10,
      //             maxAgeSeconds: 60 * 60 * 24 * 7 // <== 7 days
      //             // maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
      //           },
      //           cacheableResponse: {
      //             statuses: [0, 200]
      //           }
      //         }
      //       }
      //     ]
      //   }
      // })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        assets: resolve('src/assets'),
        '@api-mock': USE_MOCK
          ? resolve('src/api-mock')
          : resolve('src/empty'),
        'axios-mock-adapter': USE_MOCK
          ? 'axios-mock-adapter/dist/axios-mock-adapter.min.js'
          : resolve('src/empty')
      }
    },
    server: {
      port: 9099
      // proxy: {
      //   '^/api': {
      //     target: process.env.VITE_APP_API_ADDRESS,
      //     headers: {
      //       Host: process.env.VITE_APP_API_HOST,
      //       'X-Host': process.env.VITE_APP_API_ADDRESS
      //     },
      //     changeOrigin: true,
      //     followRedirects: true
      //   }
      // }
    }
  })
}
