import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { accountLoginRequest, getUserInfoById, getUserMenucByRoleId } from '@/service/login/login'
import { mapMenusToRoutes } from '@/utils/map-menus'

//定义ILoginState的类型
/**
 * @param token 用户token
 * @param userInfo 用户信息
 * @param userMenus 用户菜单权限
 */
interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}
//定义userLoginStore login是store中的唯一标识，state（data）、actions(method) 与 getters(computed)三个属性的option组合对象
const userLoginStore = defineStore('login', {
  //如何定制state的类型,定义完类型，初始化state
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      //1.账号登录，获取token
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      //拿到token后，存储到本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      //2.获取登录用户的详细信息
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      //3.根据角色请求用户的菜单权限(菜单menus)
      const userMenusResult = await getUserMenucByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      //4.进行本地的缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      //动态路由的添加
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      //5.跳转到首页
      router.push('/main')
    },

    //刷新页面，默认加载数据

    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        //动态路由的添加
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default userLoginStore
