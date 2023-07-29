/**
 * @param LOCAL 本地存储
 * @param  SESSION  会话存储
 */
enum CacheType {
  LOCAL,
  SESSION
}

/**
 * @param key 键
 * @param value 值
 * @param type 类型
 */
class Cache {
  storage: Storage
  // 构造函数,判断传入的类型是本地存储还是会话存储
  constructor(type: CacheType) {
    this.storage = type === CacheType.LOCAL ? localStorage : sessionStorage
  }
  // 设置值
  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }
  // 获取值
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  // 删除值
  removeCache(key: string) {
    this.storage.removeItem(key)
  }
  // 清空缓存
  clearCache() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.LOCAL)
const sessionCache = new Cache(CacheType.SESSION)

export { localCache, sessionCache }
