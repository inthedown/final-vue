export default [
  {
    url: '/api/program-list', // 请求地址
    method: 'get', // 请求方法
    timeout: 1000,
    response: {
        code: 200,
        message: '获取用户成功',
        'data|10': [
            {
              'id|+1': 1,
              'programName': '@word()',
              'duration|1-60': 1,
              'size': '@img',
              'resolving|1':['1920*1080(横)','1080*1920(竖)','3840*2160(横)','2160*3840(竖)'],
              'createTime': '@datetime("T")'
            }
          ],
          'total|100-999': 1
    },
  },
  {
    url: '/api/role-list', // 请求地址
    method: 'get', // 请求方法
    response: {
      code: 200,
      msg: '获取身份列表成功',
      'data': [
        {
          name: '1920*1080(横)',
          value: '1920*1080(横)',
        },
        {
          name: '1080*1920(竖)',
          value: '1080*1920(竖)',
        },
        {
          name: '3840*2160(横)',
          value: '3840*2160(横)',
        },
        {
          name: '2160*3840(竖)',
          value: '2160*3840(竖)',
        }
      ],
    },
  },

  {
    url: '/api/program/:programIds', // 请求地址
    method: 'delete', // 请求方法
    response: {
      code: 200,
      msg: '删除成功',
    },
  },
  {
    url: '/api/program/add', // 请求地址
    method: 'post', // 请求方法
    response: {
      code: 200,
      msg: '添加成功',
    },
  },
  {
    url: '/api/program/edit/:programId', // 请求地址
    method: 'put', // 请求方法
    response: {
      code: 200,
      msg: '修改成功',
    },
  },
  {
    url: '/api/program/:programId', // 请求地址
    method: 'get', // 请求方法
    response: {
      code: 200,
      msg: '获取成功',
      'data': {
        'id|1-999': 1,
        programName: '@word()',
        'duration|1-60': 1,
        'size': '@img',
        'resolving|1': ['1920*1080(横)', '1080*1920(竖)', '3840*2160(横)','2160*3840(竖)'],
        createTime: '@datetime("T")',
      },
    },
  },
]
