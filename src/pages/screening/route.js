import { pages } from '@/config'

const ScreeningList = () => import(/* webpackChunkName: 'p-screening' */ './list/index.vue')
const ScreeningCreateEdit = () => import(/* webpackChunkName: 'p-screening-create-edit' */ './createEdit/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.screening.name,
    component: ScreeningList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.screening.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.screening.create.name,
    component: ScreeningCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.screening.create.name)
    }
  },
  {
    path: pages.constant.EDIT.path,
    name: pages.screening.edit.name,
    component: ScreeningCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.screening.edit.name)
    }
  }
]
