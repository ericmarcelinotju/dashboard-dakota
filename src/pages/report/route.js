import { pages } from '@/config'

const OrderReport = () => import(/* webpackChunkName: 'p-order-report' */ './order/index.vue')

export default [
  {
    path: pages.report.order.url,
    name: pages.report.order.name,
    component: OrderReport,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.report.order.name)
    }
  }
]
