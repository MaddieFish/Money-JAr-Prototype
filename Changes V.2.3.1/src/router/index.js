import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import MoneyJarHome from '@/components/MoneyJarHome'
import Contacts from '@/components/Contacts'
import Settings from '@/components/Settings'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/dashboard',
      name: 'MoneyJarHome',
      component: MoneyJarHome,
      meta: {
          requiresAuth: true
      }
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts,
      meta: {
          requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
          requiresAuth: true
      }
    }
    // {
    //   path: '/hello',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: {
    //       requiresAuth: true
    //   }
    // }
  ]
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  let currentUser = firebase.auth().currentUser;

  if(requiresAuth && !currentUser) next ('login')
  else if (!requiresAuth && currentUser) next('hello')
  else next()
})

export default router
