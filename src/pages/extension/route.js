import { pages } from '@/config'

const ExtensionList = () => import(/* webpackChunkName: 'p-extension' */ './list/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.extension.name,
    component: ExtensionList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.extension.name)
    }
  }
]
