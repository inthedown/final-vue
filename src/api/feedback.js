import request from '@/utils/request'
export const add = data => {
    return request({
      url: '/api/feedback/add',
      method: 'post',
      data:data,
    })
}
export const getList = data => {
    return request({
      url: '/api/feedback/getList',
      method: 'post',
      data:data,
    })
}