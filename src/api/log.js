import request from '@/utils/request'
export const add = data => {
    return request({
      url: '/api/resourceLog/add',
        headers: { 'Content-Type': 'application/json'},
      method: 'post',
      data:data,
    })
}