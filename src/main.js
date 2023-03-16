import { createApp } from 'vue'
import { createPinia } from 'pinia'
import validationPlugin from './includes/validation.js'
import { auth } from './includes/firebase.js'

import App from './App.vue'
import router from './router'

import './assets/main.css'

let app

// Wait for firebase auth to init before creating the app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(validationPlugin)
    app.mount('#app')
  }
})
