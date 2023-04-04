import request from '@/utils/request'
export const getList = data => {
  return request({
    url: '/api/classes/getList',
    method: 'get',
    params: data,
  })
}

export const add = data => {
  return request({
    url: '/api/classes/add',
    method: 'post',
    data: data,
  })
}

export const getDetail = data => {
  return request({
    url: '/api/classes/getDetail',
    method: 'post',
    params: data,
  })
}