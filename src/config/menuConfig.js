const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'BankOutlined', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '图形图表',
    key: '/charts',
    icon:'BankOutlined',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar/',
        icon: 'BankOutlined'
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'BankOutlined'
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'BankOutlined'
      },
    ]
  },
]

export default menuList