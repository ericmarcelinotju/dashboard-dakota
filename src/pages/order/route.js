import { pages } from '@/config'

const OrderList = () => import(/* webpackChunkName: 'p-order' */ './list/index.vue')
const OrderCreateEdit = () => import(/* webpackChunkName: 'p-order-create-edit' */ './createEdit/index.vue')
const OrderDetail = () => import(/* webpackChunkName: 'p-order-detail' */ './detail/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.order.name,
    component: OrderList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.order.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.order.name + pages.constant.CREATE.appendName,
    component: OrderCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.order.name + pages.constant.CREATE.appendName
      )
    }
  },
  {
    path: pages.constant.DETAIL.path,
    name: pages.order.name + pages.constant.DETAIL.appendName,
    component: OrderDetail,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.order.name + pages.constant.DETAIL.appendName
      )
    }
  }
]
