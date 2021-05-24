export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },


  {
    path: '/Charts',
    name: 'chartConfig',
    icon: 'crown',
    // component: './Admin',
    routes: [
      {
        path: '/Charts/bar',
        name: 'barConfig',
        icon: 'smile',
        component: './Charts/bar',
      },
      {
        path: '/Charts/line',
        name: 'lineConfig',
        icon: 'smile',
        component: './Charts/line',
      },
      {
        path: '/Charts/pie',
        name: 'pieConfig',
        icon: 'smile',
        component: './Charts/pie',
      },
      // {
      //   path: '/Charts/scatter',
      //   name: 'ScatterConfig',
      //   icon: 'smile',
      //   component: './Charts/line',
      // },
      {
        path: '/Charts/liquidfill',
        name: 'liquidFillConfig',
        icon: 'smile',
        component: './Charts/liquidfill',
      },
      {
        path: '/Charts/map',
        name: 'mapConfig',
        icon: 'smile',
        component: './Charts/map',
      },
      {
        path: '/Charts/wordCloud',
        name: 'wordCloudConfig',
        icon: 'smile',
        component: './Charts/wordCloud',
      },
      {
        path: '/Charts/radar',
        name: 'radarConfig',
        icon: 'smile',
        component: './Charts/radar',
      },
      // {
      //   path: '/Charts/funnel',
      //   name: 'funnelConfig',
      //   icon: 'smile',
      //   component: './Charts/line',
      // },
      // {
      //   path: '/Charts/gauge',
      //   name: 'gaugeConfig',
      //   icon: 'smile',
      //   component: './Charts/line',
      // },
    ],
  },
  {
    name: 'person',
    icon: 'table',
    path: '/PersonCenter',
    component: './PersonCenter/PersonCenter.js',
  },







  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
