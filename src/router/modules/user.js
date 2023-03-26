const Layout = () => import('@/layout/index.vue')
const List = () => import('@/views/test/Usermanage.vue')
const Add = () => import('@/views/test/Add.vue')
const Edit = () => import('@/views/test/Edit.vue')


export default [
  {
    path: '/user',
    component: Layout,
    name: 'user',
    meta: {
      title: '课堂管理',
    },
    icon: 'el-icon-location',
    children: [
      {
        path: '',
        name: 'userList',
        component: List,
        meta: {
          title: '课堂管理',
        },
      },
      {
        path: 'add',
        name: 'testAdd',
        component: Add,
        meta: {
          title: '添加',
        },
        hidden: false, // 不在菜单中显示
      },
      {
        path: 'edit/:id',
        name: 'testEdit',
        component: Edit,
        meta: {
          title: '编辑',
        },
        hidden: true, // 不在菜单中显示
      },
      
    ],
  },
]
