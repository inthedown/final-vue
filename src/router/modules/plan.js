const Layout = () => import('@/layout/index.vue')

const PlanList = () => import('@/views/plan/planIndex.vue')
const PlanAdd = () => import('@/views/plan/planAdd.vue')

export default [
  {
    path: '/plan',
    component: Layout,
    name: 'plan',
    meta: {
      title: '计划管理',
    },
    icon: '计划书',
    children: [
      {
        path: '',
        name: 'planList',
        component: PlanList,
        meta: {
          title: '计划列表',
        },
        icon: '添加计划',
      },
      {
        path: 'examine',
        name: 'examineList',
        component: PlanList,
        meta: {
          title: '计划审核',
        },
        icon: '计划',
      },
      {
        path: 'add',
        name: 'planAdd',
        component: PlanAdd,
        meta: {
          title: '创建计划',
        },
        hidden: true,
      },
      {
        path: 'edit/:id',
        name: 'planEdit',
        component: PlanAdd,
        meta: {
          title: '编辑计划',
        },
        hidden: true,
      },
    ],
  },
]
