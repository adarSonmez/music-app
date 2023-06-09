import { createApp } from 'vue'
import { createPinia } from 'pinia'
import validationPlugin from './includes/validation.js'
import { auth } from './includes/firebase.js'
import i18n from '@/includes/i18n.js'
import Icon from '@/directives/icon.js'
import { registerSW } from 'virtual:pwa-register'
import progressBar from './includes/progress-bar.js'
import GlobalComponents from '@/includes/_globals.js'

import '@/assets/main.css'
import 'nprogress/nprogress.css'

import App from './App.vue'
import router from './router'

registerSW({ immediate: true })
progressBar(router)

let app

// Wait for firebase auth to init before creating the app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(validationPlugin)
    app.use(i18n)
    app.directive('icon', Icon)
    app.use(GlobalComponents)
    app.mount('#app')
  }
})
