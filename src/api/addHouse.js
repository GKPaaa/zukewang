import request from '@/utils/request'

export const addHouse = (data
) => {
  return request({
    method: 'post',
    url: '/user/houses',
    data
  })
}
