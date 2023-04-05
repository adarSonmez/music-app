import { createRouter, createWebHistory } from 'vue-router'

// Lazy loading
const HomeView = () => import('@/views/HomeView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const ManageView = () => import('@/views/ManageView.vue')
const SongView = () => import('@/views/SongView.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/manage-music',
    // alias: '/manage',
    name: 'Manage',
    component: ManageView,
    meta: {
      requiresAuth: true
    }
    /*
    beforeEnter: (to, from, next) => {
      console.log('Before enter guard')
      next()
    }*/
  },
  {
    path: '/manage',
    redirect: { name: 'Manage' }
  },
  {
    path: '/song/:songId',
    name: 'Song',
    component: SongView
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

/*
router.beforeEach((to, from, next) => {
  console.log('Global guard')

  if (!to.name.meta.requiresAuth) {
    next()
    return
  } 
      
  const store = useUserStore()
  if (store.isLoggedIn) next()
  else next({ name: 'Home' })
})
*/

export default router
