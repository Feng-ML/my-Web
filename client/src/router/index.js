import Vue from 'vue'
import VueRouter from 'vue-router'

import home from "../views/Home/Home.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '*',
    name: 'noFound',
    component: ()=> import('../views/404.vue')
  },
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
        component: ()=> import('../views/animation/index.vue'),
      },
      {
        path: 'charts',
        name: 'charts',
        component: ()=> import('../views/charts/index.vue'),
        children: [
          {
            path: '/',
            redirect: '/home/charts/fundCharts'
          },
          {
            path: '/home/charts/fundCharts',
            name: 'fundCharts',
            component: ()=> import('../views/charts/fundCharts.vue')
          }
        ]
      },
      {
        path: 'component',
        name: 'component',
        component: ()=> import('../views/component/index.vue'),
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
  },
  {
    //疫情数据可视化
    path: '/home/charts/COVID-19',
    name: 'COVID-19',
    component: ()=> import('../views/charts/COVID-19.vue')
  },
  {
    //墨斗建店数据可视化
    path: '/home/charts/mode',
    name: 'mode',
    component: ()=> import('../views/charts/mode/mode.vue')
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log(to);
//   next()
// })

export default router
