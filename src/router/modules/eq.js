const Layout = () => import('@/layout/index.vue')
const List = () => import('@/views/test/equipment.vue')
const Add = () => import('@/views/test/Add.vue')
const Edit = () => import('@/views/test/Edit.vue')
const Group = () => import('@/views/test/GroupList.vue')

export default [
  {
    path: '/eq',
    component: Layout,
    name: 'eq',
    meta: {
      title: '设备管理',
    },
    icon: 'el-icon-location',
    children: [
      {
        path: '',
        name: 'eqList',
        component: List,
        meta: {
          title: '设备列表',
        },
      },
      {
        path: 'add',
        name: 'testAdd',
        component: Add,
        meta: {
          title: '添加',
        },
        hidden: true, // 不在菜单中显示
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
      {
        path: 'test',
        name: 'groupList',
        component: Group,
        meta: {
          title: '分组列表',
        },
      },
      {
        path: 'add',
        name: 'testAdd',
        component: Add,
        meta: {
          title: '添加',
        },
        hidden: true, // 不在菜单中显示
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
