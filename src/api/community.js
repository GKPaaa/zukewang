import request from '@/utils/request'

export const searchCommunity = ({ id, name }) => {
  return request({
    url: '/area/community',
    params: {
      id,
      name
    }
  })
}
