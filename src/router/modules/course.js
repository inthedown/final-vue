const Layout = () => import('@/layout/index.vue')
const Course = () => import('@/views/course/index.vue')
const AddCourse =()=>import('@/views/course/addCourse.vue')
const CourseDteail =()=>import('@/views/course/courseDetail.vue')
const CourseDraw =()=>import('@/views/course/drawMapv2.vue')
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
          title: '创建/修改课程',
          affix:false,
        },
        hidden:true,
      },
      {
        path: '/detail',
        name: 'courseDetail',
        component: CourseDteail,
        meta: {
          title: '课程详情',
          affix:false,
        },
        hidden:true
      },
      {
        path: '/draw',
        name: 'courseDraw',
        component: CourseDraw,
        meta: {
          title: '画布',
          affix:false,
        },
        hidden:true
      },
    ],
  },
]