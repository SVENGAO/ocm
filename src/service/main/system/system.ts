import hyRequest from '@/service'

/**
 * 分页获取用户列表
 */
export function postUsersListData() {
  return hyRequest.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10
    }
  })
}
