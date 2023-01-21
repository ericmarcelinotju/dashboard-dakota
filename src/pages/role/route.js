import { pages } from '@/config'

const RoleList = () => import(/* webpackChunkName: 'p-role' */ './list/index.vue')
const RoleCreateEdit = () => import(/* webpackChunkName: 'p-role-create-edit' */ './createEdit/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.role.name,
    component: RoleList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.role.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.role.name + pages.constant.CREATE.appendName,
    component: RoleCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.role.name + pages.constant.CREATE.appendName
      )
    }
  },
  {
    path: pages.constant.EDIT.path,
    name: pages.role.name + pages.constant.EDIT.appendName,
    component: RoleCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.role.name + pages.constant.EDIT.appendName
      )
    }
  }
]
