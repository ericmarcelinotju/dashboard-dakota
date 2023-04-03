import { pages } from '@/config'

const TicketList = () => import(/* webpackChunkName: 'p-ticket' */ './list/index.vue')
const TicketDetail = () => import(/* webpackChunkName: 'p-ticket-create-edit' */ './detail/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.ticket.name,
    component: TicketList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.ticket.name)
    }
  },
  {
    path: pages.constant.DETAIL.path,
    name: pages.ticket.name + pages.constant.DETAIL.appendName,
    component: TicketDetail,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.ticket.name + pages.constant.DETAIL.appendName
      )
    }
  }
]
