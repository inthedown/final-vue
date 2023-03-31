import request from '@/utils/request'
export const getList = data => {
    return request({
      url: '/api/user1/getList',
      method: 'post',
    data: data,
    })
}
export const addUser = data => {
  return request({
    url: '/api/user1/addUser',
    method: 'post',
  data: data,
  })
}
export const deleteUser = data => {
  return request({
    url: '/api/user1/deleteUser',
    method: 'post',
  data: data,
  })
}
export const seePwd = data => {
  return request({
    url: '/api/user1/seePwd/'+data,
    method: 'get',

  })
}