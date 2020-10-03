import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Liuyan from '../views/Liuyan.vue'
import fundList from '../views/fundList.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'
import welcome from '../views/welcome.vue'
import animation from '../views/animation.vue'

import charts from '../views/charts.vue'
import fundUse from '../views/charts/fundUse.vue'
import fundFlow from '../views/charts/fundFlow.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  // {
  //   path: '*',
  //   redirect: '/home'
  // },
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
        path: 'about',
        name: 'about',
        component: About
      },
      {
        path: 'Liuyan',
        name: 'liuyan',
        component: Liuyan,
      },
      {
        path: 'fundList',
        name: 'fundList',
        component: fundList,
      },
      {
        path: 'animation',
        name: 'animation',
        component: animation,
      },
      {
        path: 'charts',
        name: 'charts',
        component: charts,
        children: [
          {
            path: '/',
            redirect: '/home/charts/fundUse'
          },
          {
            path: '/home/charts/fundUse',
            name: 'fundUse',
            component: fundUse
          },
          {
            path: '/home/charts/fundFlow',
            name: 'fundFlow',
            component: fundFlow
          }
        ]
      }
    ]
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
