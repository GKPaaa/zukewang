import request from '@/utils/request'

export const getLogin = ({ username, password }) => {
  return request({
    method: 'post',
    url: 'user/login',
    data: {
      username,
      password
    }
  })
}
export const getInfo = () => {
  return request({
    url: '/user'
  })
}
