<script>
import AppHeader from './components/AppHeader.vue'
import AppAuth from './components/AppAuth.vue'
import AppPlayer from './components/AppPlayer.vue'
import useUserStore from './stores/user'
import { mapWritableState } from 'pinia'
import { auth } from '@/includes/firebase'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppAuth,
    AppPlayer
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  // Lifecycle function is called when the component is created
  created() {
    // Check if user is logged in
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>

<template>
  <!-- Header -->
  <app-header></app-header>

  <!-- Main Content -->
  <router-view></router-view>

  <!-- Player -->
  <app-player></app-player>

  <!-- Auth Modal -->
  <app-auth></app-auth>
</template>
