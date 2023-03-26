import request from '@/utils/request'

export const getProgramList = params => {
  return request({
    url: '/api/program/getAll',
    method: 'post',
    data: params,
  })
}
export const deleteProgram = programIds => {
  return request({
    url: `/api/program/delete`,
    method: 'delete',
    data: programIds,
  })
}
export const addProgram = data => {
  return request({
    url: `/api/program/upload`,
    method: 'post',
    data,
  })
}

export const editProgram = data => {
  return request({
    url: `/api/program/edit/${data.id}`,
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

export const getProgramInfo = programId => {
  return request({
    url: `/api/program/${programId}`,
    method: 'get',
  })
}
