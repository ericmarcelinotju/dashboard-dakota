import { pages } from '@/config'

const StudioList = () => import(/* webpackChunkName: 'p-studio' */ './list/index.vue')
const StudioCreateEdit = () => import(/* webpackChunkName: 'p-studio-create-edit' */ './createEdit/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.studio.name,
    component: StudioList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.studio.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.studio.name + pages.constant.CREATE.appendName,
    component: StudioCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.studio.name + pages.constant.CREATE.appendName
      )
    }
  },
  {
    path: pages.constant.EDIT.path,
    name: pages.studio.name + pages.constant.EDIT.appendName,
    component: StudioCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.studio.name + pages.constant.EDIT.appendName
      )
    }
  }
]
