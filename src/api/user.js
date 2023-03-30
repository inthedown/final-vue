import request from '@/utils/request'
export const getList = data => {
    return request({
      url: '/api/user1/getList',
      method: 'post',
    data: data,
    })
}