import request from '@/utils/request'

export const imgUp = (data) => {
  return request({
    method: 'post',
    url: '/houses/image',
    data
  })
}
