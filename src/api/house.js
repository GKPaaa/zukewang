import request from '@/utils/request'

export const housesAPI = ({ cityId, area, subway, rentType, price, more, roomType, oriented, characteristic, floor, start, end }) => {
  return request({
    url: '/houses',
    params: {
      cityId, area, subway, rentType, price, more, roomType, oriented, characteristic, floor, start, end
    }
  })
}
/**
 *   查看收藏的房子列表
 * @returns
 */
export const favorate = () => {
  return request({
    url: '/user/favorites'
  })
}
/**
 * 查看出租列表
 * @returns
 */
export const rent = () => {
  return request({
    url: '/user/houses'
  })
}
/**
 *获取发布房间所需要的条件
 * @returns
 */
export const publishAPI = () => {
  return request({
    url: '/houses/params'
  })
}
/**
 *  根据城市的id获取该城市的查询条件 放在找房界面
 * @param {*} id
 * @returns
 */
export const conditionAPI = (id) => {
  return request({
    url: '/houses/condition',
    params: {
      id
    }
  })
}

/**
 * 收藏房屋
 * @param {*} id
 * @returns
 */
export const collectionAPI = (id) => {
  return request({
    method: 'post',
    url: `/user/favorites/${id}`

  })
}

/**
 * 查看房屋是否已经收藏
 * @param {*} id
 * @returns
 */
export const isCollection = (id) => {
  return request({
    url: `/user/favorites/${id}`
  })
}

/**
 *  删除收藏的房屋
 * @param {房间的code值可以在上方路径中直接拿下来通过（$route.data.id）} id
 * @returns
 */
export const delCollectionAPI = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'DELETE'
  })
}

/**
 *  接口说明是咨询，看获取来的数据发现是猜你喜欢的房源，写死的固定的所以可以给固定的携带参数
 * @param {*} param0
 * @returns
 */
export const newsAPI = ({ area }) => {
  return request({
    url: '/home/news',
    params: {
      area
    }
  })
}

/**
 * 获取房间发布的要求
 * @returns
 */
export const housesParams = () => {
  return request({
    url: '/houses/params'
  })
}
