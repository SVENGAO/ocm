import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig } from './type'
//拦截器：蒙版loading/token/修改配置
/*
    1.全局拦截
    2.实例拦截
    3、单次请求拦截
*/

class HYRequest {
  instance: AxiosInstance

  //requsest实例=》axios实例
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    //每个实例都可以添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        //请求拦截
        //locading/token
        console.log('请求拦截')
        return config
      },
      (err) => {
        //请求失败
        console.log('请求失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        //响应拦截
        console.log('响应拦截')
        return res.data
      },
      (err) => {
        //响应失败
        console.log('响应失败')
        return err
      }
    )

    //针对特定的HYRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  //封装网络请求方法
  //T=IHomeData
  request<T = any>(config: HYRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    //返回promise

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
