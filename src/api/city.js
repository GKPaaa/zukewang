import request from '@/utils/request'
/**
 *获取全部城市
 * @returns
 */
export const allCityAPI = () => {
  return request({
    url: '/area/city?level=1'
  })
}
/**
 * 获取某一个城市的基本信息，例如id等的信息，用来查询房屋的详情信息
 * @param {*} name
 * @returns
 */
export const cityInfoAPI = (name) => {
  return request({
    url: '/area/info',
    params: {
      name
    }
  })
}

/**
 * 获取当前的热门城市
 * @returns
 */
export const hotCityAPI = () => {
  return request({
    url: '/area/hot'
  })
}
