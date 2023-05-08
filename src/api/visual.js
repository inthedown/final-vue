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
export const getBack =()=> {
  return request({
    url: '/api/feedback/getBackMsg',
    method: 'get',
  })
}
export const getCircles =(data)=> {
  return request({
    url: '/api/visual/getDonutMap',
    method: 'get',
    params:data
  })
}
