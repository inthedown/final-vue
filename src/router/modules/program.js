const Layout = () => import('@/layout/index.vue')
const ProgramList = () => import('@/views/program/programIndex.vue')
const ProgramAdd = () => import('@/views/program/programAdd.vue')

export default [
  {
    path: '/program',
    component: Layout,
    name: 'program',
    meta: {
      title: '节目制作与发布',
    },
    icon: '节目单',
    children: [
      {
        path: '',
        name: 'programList',
        component: ProgramList,
        meta: {
          title: '发布节目',
        },
        icon: '发布',
      },
      {
        path: 'publish',
        name: 'publishList',
        component: ProgramList,
        meta: {
          title: '发布公告',
        },
        icon: '导航栏-节目管理',
      },
      {
        path: 'add',
        name: 'programAdd',
        component: ProgramAdd,
        meta: {
          title: '创建节目',
        },
        hidden: true,
      },
      {
        path: 'edit/:id',
        name: 'programEdit',
        component: ProgramAdd,
        meta: {
          title: '编辑节目',
        },
        hidden: true,
      },
    ],
  },
]
