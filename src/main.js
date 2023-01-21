import { createApp } from 'vue'
// import { registerSW } from 'virtual:pwa-register'

import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import Notifications from 'notiwind'

/** styling */
import '@/assets/scss/main.scss'

const initApp = () => {
  console.log('[atum] initializing vue app...')
  /** register service worker */
  // registerSW()

  createApp(App)
    .use(router)
    .use(store)
    .use(i18n)
    .use(Notifications)
    .mount('#app')
}

/** api mocks */
import('@api-mock')
  .then(initApp)
  .catch(err => console.log('[atum] error creating vue-app:\n', err))
