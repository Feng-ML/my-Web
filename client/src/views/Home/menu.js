const menu = [

    {
      name: '首页',
      path: '/home',
      icon: 'el-icon-s-home'
    },
    {
      name: '资金管理',
      path: '/home/fundList',
      icon: 'el-icon-s-management'
    },
    {
      name: '图表',
      path: '',
      icon: 'el-icon-data-line',
      children:[
        {
          name: '资金用途',
          path: '/home/charts/fundUse',
          // icon: 'el-icon-s-opportunity'
        },
        {
          name: '资金流水',
          path: '/home/charts/fundFlow',
          // icon: 'el-icon-s-opportunity'
        },
        {
          name: '疫情实时',
          path: '/home/charts/COVID-19',
          // icon: 'el-icon-s-opportunity'
        }
      ]
    },
    {
      name: '组件',
      path: '/home/component',
      icon: ''
    },
    {
      name: '小动画',
      path: '/home/animation',
      icon: 'el-icon-s-opportunity'
    },
    {
      name: '关于',
      path: '/home/about',
      icon: 'el-icon-user-solid'
    },
    {
      name: '留言版',
      path: '/home/liuyan',
      icon: 'el-icon-s-promotion'
    },
]

export default {
    menu
}