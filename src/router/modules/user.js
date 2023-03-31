const Layout = () => import('@/layout/index.vue')
const List = () => import('@/views/test/Usermanage.vue')
const classList = () => import('@/views/classes/index.vue')


export default [
  {
    path: '/user',
    component: Layout,
    name: 'user',
    meta: {
      title: '管理模块',
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
      },
      {
        path: '/classesManage',
        name: 'classesList',
        component: classList,
        meta: {
          title: '班级管理',
        },
      }

      
    ],
  },
]
