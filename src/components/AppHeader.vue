<script>
import { mapStores } from 'pinia'
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'

export default {
  name: 'AppHeader',
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen
    },
    logout() {
      this.userStore.signOut()
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'Home' })
      }

      /* 
      if (this.$route.name !== 'Manage') {
        this.$router.push({ name: 'Home' })
      }
      */
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'en' ? 'fr' : 'en'
    }
  },
  computed: {
    ...mapStores(useModalStore, useUserStore),
    currentLocale() {
      return this.$i18n.locale === 'en' ? 'English' : 'Français'
    }
  }
}
</script>

<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'Home' }"
        exact-active-class="no-active"
        >Music</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'About' }">
              {{ $t('header.about') }}
            </router-link>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">
              {{ $t('header.logReg') }}
            </a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'Manage' }">
                {{ $t('header.manage') }}
              </router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="logout()">
                {{ $t('header.logout') }}
              </a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="changeLocale">
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
