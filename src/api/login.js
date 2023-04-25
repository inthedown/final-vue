
import { TOKEN } from '@/store/modules/app'
import request from '@/utils/request'

// 登录接口
export const Login = data => {
  return request({
    url: '/api/user1/login',
    method: 'post',
    data,
  })
}


// 获取登录用户信息
export const GetUserinfo = () => {
  return request({
    url: '/api/user1/userinfo',
    method: 'get'
  })
}
