import request from '@/utils/request'

export const detailAPI = (houseID) => {
  return request({
    url: `/houses/${houseID}`

  })
}
/**
 * 上传房屋的图片
 * @param {*} param0
 * @returns
 */
export const houseImg = ({ file }) => {
  return request({
    method: 'POST',
    url: '/houses/image',
    headers: {
      ContentType: 'multipart/ form - data'
    },
    data: {
      file
    }
  })
}
/**
 *添加房屋收藏
 * @param {*} id
 * @returns
 */
export const collect = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'post'
  })
}
