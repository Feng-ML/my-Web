import Vue from 'vue'
import VueRouter from 'vue-router'

import home from "../views/Home.vue";

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
    // component: ()=> import('../views/Home.vue'),
    component: home,
    children: [
      {
        path: '/',
        name: 'welcome',
        component: ()=> import('../views/welcome.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: ()=> import('../views/About.vue')
      },
      {
        path: 'Liuyan',
        name: 'liuyan',
        component: ()=> import('../views/Liuyan.vue'),
      },
      {
        path: 'fundList',
        name: 'fundList',
        component: ()=> import('../views/fundList.vue'),
      },
      {
        path: 'animation',
        name: 'animation',
        component: ()=> import('../views/animation.vue'),
      },
      {
        path: 'charts',
        name: 'charts',
        component: ()=> import('../views/charts/charts.vue'),
        children: [
          {
            path: '/',
            redirect: '/home/charts/fundUse'
          },
          {
            path: '/home/charts/fundUse',
            name: 'fundUse',
            component: ()=> import('../views/charts/fundUse.vue')
          },
          {
            path: '/home/charts/fundFlow',
            name: 'fundFlow',
            component: ()=> import('../views/charts/fundFlow.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: ()=> import('../views/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: ()=> import('../views/register.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
