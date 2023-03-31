import request from '@/utils/request'
export const getList = data => {
  return request({
    url: '/api/classes/getList',
    method: 'get',
    params: data,
  })
}

