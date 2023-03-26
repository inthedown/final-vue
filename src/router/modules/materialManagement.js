const Layout = () => import('@/layout/index.vue')
const List = () => import('@/views/materialManagement/materialManagement.vue')
export default [
  {
    path: '/materialMangement',
    component: Layout,
    name: 'materialMangement',
    alwaysShow: true,
    meta: {
      title: '素材管理',
    },
    icon: 'el-icon-location',
    children: [
      {
        path: '/materialList',
        name: 'materialList',
        component: List,
        alwaysShow: true,
        meta: {
          title: '素材列表',
        },
      },
      {
        path: '/materialList',
        name: 'materialList',
        component: List,
        alwaysShow: true,
        meta: {
          title: '素材列表',
        },
      },
    ],
  },
]
