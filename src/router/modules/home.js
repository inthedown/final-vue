
const Layout = () => import('@/layout/index.vue')
const Home = () => import('@/views/home/index.vue')

export default [
  {
    path: '/home',
    component: Layout,
    name: 'Dashboard',
    meta: {
      title: '首页概况',
    },
    icon: 'home',
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: {
          title: '首页',
          affix: true,
        },
      },
    ],
  },
]
