import request from '@/utils/request'
export const getList = data => {
    return request({
      url: '/api/course/getList',
      method: 'post',
      data:data,
    })
}
export const add = data => {
    return request({
      url: '/api/course/add',
      method: 'post',
      params: data,
    })
}
export const deleteCourse = data => {
    return request({
      url: '/api/course/delete/'+data,
      method: 'post',
    })
}
export const getDetail = data => {
    return request({
      url: '/api/course/getDetail',
      method: 'post',
      params: data,
    })
}