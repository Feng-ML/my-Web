const menu = [

    {
      name: '首页',
      path: '/home',
      icon: 'icon-shouye'
    },
    {
      name: '资金管理',
      path: '/home/fundList',
      icon: 'icon-zijin'
    },
    {
      name: '图表',
      path: '',
      icon: 'icon-tubiao',
      children:[
        {
          name: '资金图表',
          path: '/home/charts/fundCharts',
          icon: 'icon-desk_7'
        },
        {
          name: '疫情实时',
          path: '/home/charts/COVID-19',
          icon: 'icon-yiqing'
        },
        {
          name: '墨斗建店平台',
          path: '/home/charts/mode',
          icon: 'icon-dianpu'
        }
      ]
    },
    {
      name: '组件',
      path: '/home/component',
      icon: 'icon-zujian'
    },
    {
      name: '小动画',
      path: '/home/animation',
      icon: 'icon-donghua'
    },
    {
      name: '关于',
      path: '/home/about',
      icon: 'icon-xinxi'
    },
    {
      name: '留言版',
      path: '/home/liuyan',
      icon: 'icon-liuyan'
    },
]

export default {
    menu
}