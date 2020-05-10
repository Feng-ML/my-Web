import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Liuyan from '../views/Liuyan.vue'
import fundList from '../views/fundList.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'
import welcome from '../views/welcome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'welcome',
        component: welcome
      },
      {
        path: '/home/about',
        name: 'about',
        component: About
      },
      {
        path: '/home/Liuyan',
        name: 'liuyan',
        component: Liuyan,
      },
      {
        path: '/home/fundList',
        name: 'fundList',
        component: fundList,
      }
    ]
  },
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  }
]

const router = new VueRouter({
  routes
})

export default router
