import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from './../global/constants'
import { BASE_URL, TIMEOUT } from './config'
import HYRequest from './request'

//实例化网络请求，所有的网络请求都在service中完成
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 携带token的拦截
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})
export default hyRequest
