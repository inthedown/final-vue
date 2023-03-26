export default [
    {
      url: '/api/plan-list', // 请求地址
      method: 'get', // 请求方法
      timeout: 1000,
      response: {
          code: 200,
          message: '获取用户成功',
          'data|10': [
              {
                'id|+1': 1,
                'planName': '@name()',
                'image': '@img()',
                'author': '@name',
                'state|1':['待发布','已发布','已失效','已结束'],
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
            name: '待发布',
            value: '待发布',
          },
          {
            name: '已发布',
            value: '已发布',
          },
          {
            name: '已失效',
            value: '已失效',
          },
          {
            name: '已结束',
            value: '已结束',
          }
        ],
      },
    },
  
    {
      url: '/api/plan/:planIds', // 请求地址
      method: 'delete', // 请求方法
      response: {
        code: 200,
        msg: '删除成功',
      },
    },
    {
      url: '/api/plan/add', // 请求地址
      method: 'post', // 请求方法
      response: {
        code: 200,
        msg: '添加成功',
      },
    },
    {
      url: '/api/plan/edit/:planId', // 请求地址
      method: 'put', // 请求方法
      response: {
        code: 200,
        msg: '修改成功',
      },
    },
    {
      url: '/api/plan/:planId', // 请求地址
      method: 'get', // 请求方法
      response: {
        code: 200,
        msg: '获取成功',
        'data': {
          'id|1-999': 1,
          planName: '@name()',
          image: '@email()',
          'author': '@name()',
          'state|1': ['待发布', '已发布', '已失效','已结束'],
          createTime: '@datetime("T")',
        },
      },
    },
  ]
  