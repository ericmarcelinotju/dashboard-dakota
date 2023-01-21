import { pages } from '@/config'

const LogList = () => import(/* webpackChunkName: 'p-log' */ './list/index.vue')

export default [
  {
    path: pages.log.url + pages.log.system.url,
    name: pages.log.system.name,
    component: LogList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.log.system.name),
      type: 'system'
    }
  },
  {
    path: pages.log.url + pages.log.event.url,
    name: pages.log.event.name,
    component: LogList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.log.event.name),
      type: 'event'
    }
  }
]
