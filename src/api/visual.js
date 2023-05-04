import request from '@/utils/request'
export const getStatus =()=> {
    return request({
      url: '/api/visual/getCourseStatus',
      method: 'get',
    })
}
export const getStuActiveMap =()=> {
    return request({
      url: '/api/visual/getStuActiveMap',
      method: 'get',
    })
}
export const getMap =()=> {
    return request({
      url: '/api/visual/getMap',
      method: 'get',
    })
}