import request from '@/utils/request'

export const getSwiperAPI = () => {
  return request({
    url: '/home/swiper'
  })
}
export const groupsAPI = () => {
  return request({
    url: '/home/groups'
  })
}
