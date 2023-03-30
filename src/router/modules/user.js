const Layout = () => import('@/layout/index.vue')
const List = () => import('@/views/test/Usermanage.vue')



export default [
  {
    path: '/user',
    component: Layout,
    name: 'user',
    meta: {
      title: '用户管理',
    },
    icon: 'el-icon-location',
    children: [
      {
        path: '/userManage',
        name: 'userList',
        component: List,
        meta: {
          title: '用户管理',
        },
      }
      
    ],
  },
]
