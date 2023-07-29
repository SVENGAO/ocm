import hyRequest from '..'
import type { IAccount } from '@/types'

/**
 *
 * @param account 登录参数
 * @returns
 */
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}
/**
 *
 * @param id 获取用户信息
 * @returns
 */
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}
/**
 *
 * @param id 获取用户菜单
 * @returns
 */

export function getUserMenucByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
