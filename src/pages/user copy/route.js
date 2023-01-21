import { pages } from '@/config'

const UserList = () => import(/* webpackChunkName: 'p-user' */ './list/index.vue')
const UserCreateEdit = () => import(/* webpackChunkName: 'p-user-create-edit' */ './createEdit/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.user.name,
    component: UserList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.user.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.user.name + pages.constant.CREATE.appendName,
    component: UserCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.user.name + pages.constant.CREATE.appendName
      )
    }
  },
  {
    path: pages.constant.EDIT.path,
    name: pages.user.name + pages.constant.EDIT.appendName,
    component: UserCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.user.name + pages.constant.EDIT.appendName
      )
    }
  }
]
