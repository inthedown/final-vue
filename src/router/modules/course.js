const Layout = () => import('@/layout/index.vue')
const Course = () => import('@/views/course/index.vue')
const AddCourse =()=>import('@/views/course/addCourse.vue')
export default [
  {
    path: '/course',
    component: Layout,
    name: 'course',
    meta: {
      title: '我的课程',
    },
    icon: 'home',
    children: [
      {
        path: '',
        name: 'course',
        component: Course,
        meta: {
          title: '我的课程',
          affix: true,
        },
      },
      {
        path: '/add',
        name: 'courseAdd',
        component: AddCourse,
        meta: {
          title: '创建课程',
          affix: true,
        },
      },
    ],
  },
]