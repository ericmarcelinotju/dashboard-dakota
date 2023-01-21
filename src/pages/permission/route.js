import { pages } from '@/config'

const PermissionList = () => import(/* webpackChunkName: 'p-permission' */ './list/index.vue')
const PermissionCreateEdit = () => import(/* webpackChunkName: 'p-permission-create-edit' */ './createEdit/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.permission.name,
    component: PermissionList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.permission.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.permission.create.name,
    component: PermissionCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.permission.edit.name)
    }
  },
  {
    path: pages.constant.EDIT.path,
    name: pages.permission.edit.name,
    component: PermissionCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.permission.edit.name)
    }
  }
]
