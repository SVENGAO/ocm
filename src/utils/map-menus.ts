import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  //1、动态获取所有的路由对象，放到数组中
  //路由对象都在独立的文件之中
  //从文件中将所有的路由对象都导入进来

  const localRoutes: RouteRecordRaw[] = []

  //1.1读取router/main文件夹下所有的ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true })

  //1.2将加载的对象放到localRoutes中
  for (const key in files) {
    const module = files[key]
    console.log(module.default)
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  //1、加载本地路由
  const localRoutes = loadLocalRoutes()
  //2、根据菜单获取需要添加的路由
  const routes: RouteRecordRaw[] = []
  //2.1遍历所有的菜单
  for (const menu of userMenus) {
    //2.1遍历所有的菜单的子菜单
    for (const submenu of menu.children) {
      //它的作用是在 localRoutes 数组中找到 path 属性与 submenu.url 相等的项，
      //并将其赋值给 route 变量。
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        //给route的顶层菜单增加重定向功能（但是只需要添加一次即可）
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }

        //将二级菜单对应的路径添加到路由上
        routes.push(route)
      }
      //记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}
/**
 * 根据路径去配需要显示的菜单
 * @param path
 * @param userMenus
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

/**
 * @param time
 *
 */

interface IBreadcrumbs {
  name: string
  path: string
}

export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  //1、定义面包屑
  const breadcrumbs: IBreadcrumbs[] = []
  //2、遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url == path) {
        //1、顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        //2、匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
