import { pages } from '@/config'

const StaffList = () => import(/* webpackChunkName: 'p-staff' */ './list/index.vue')
const StaffCreateEdit = () => import(/* webpackChunkName: 'p-staff-create-edit' */ './createEdit/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.staff.name,
    component: StaffList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.staff.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.staff.name + pages.constant.CREATE.appendName,
    component: StaffCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.staff.name + pages.constant.CREATE.appendName
      )
    }
  },
  {
    path: pages.constant.EDIT.path,
    name: pages.staff.name + pages.constant.EDIT.appendName,
    component: StaffCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.staff.name + pages.constant.EDIT.appendName
      )
    }
  }
]
