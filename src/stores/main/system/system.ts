import { postUsersListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from '@/types/system'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    usersTotalCount: 0
  }),
  actions: {
    //发送请求获取用户列表
    async postUsersListAction() {
      const usersListRestlt = await postUsersListData()
      const { list, totalCount } = usersListRestlt.data
      this.userList = list
      this.usersTotalCount = totalCount
    }
  }
})

export default useSystemStore
