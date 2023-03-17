import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ManageView from '@/views/ManageView.vue'

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
