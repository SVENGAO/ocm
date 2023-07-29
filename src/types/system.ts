//用户信息的类型
export interface IUser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}
//用户列表的类型
export interface ISystemState {
  userList: IUser[]
  usersTotalCount: number
}
