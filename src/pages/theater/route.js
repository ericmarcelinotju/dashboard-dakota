import { pages } from '@/config'

const TheaterList = () => import(/* webpackChunkName: 'p-theater' */ './list/index.vue')
const TheaterCreateEdit = () => import(/* webpackChunkName: 'p-theater-create-edit' */ './createEdit/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.theater.name,
    component: TheaterList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.theater.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.theater.name + pages.constant.CREATE.appendName,
    component: TheaterCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.theater.name + pages.constant.CREATE.appendName
      )
    }
  },
  {
    path: pages.constant.EDIT.path,
    name: pages.theater.name + pages.constant.EDIT.appendName,
    component: TheaterCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.theater.name + pages.constant.EDIT.appendName
      )
    }
  }
]
