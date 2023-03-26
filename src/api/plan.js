import request from '@/utils/request'

export const getPlanList = data => {
  return request({
    url: '/api/plan-list',
    method: 'get',
    params: data,
  })
}
export const deletePlan = planIds => {
  return request({
    url: `/api/plan/${planIds}`,
    method: 'delete',
  })
}
export const addPlan = data => {
  return request({
    url: `/api/plan/add`,
    method: 'post',
    data,
  })
}

export const editPlan = data => {
  return request({
    url: `/api/plan/edit/${data.id}`,
    method: 'put',
    data,
  })
}
export const getRoleList = data => {
  return request({
    url: '/api/role-list',
    method: 'get',
    params: data,
  })
}

export const getPlanInfo = planId => {
  return request({
    url: `/api/plan/${planId}`,
    method: 'get',
  })
}