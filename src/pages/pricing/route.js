import { pages } from '@/config'

const PricingList = () => import(/* webpackChunkName: 'p-pricing' */ './list/index.vue')
const PricingCreateEdit = () => import(/* webpackChunkName: 'p-pricing-create-edit' */ './createEdit/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.pricing.name,
    component: PricingList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.pricing.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.pricing.name + pages.constant.CREATE.appendName,
    component: PricingCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.pricing.name + pages.constant.CREATE.appendName
      )
    }
  },
  {
    path: pages.constant.EDIT.path,
    name: pages.pricing.name + pages.constant.EDIT.appendName,
    component: PricingCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.pricing.name + pages.constant.EDIT.appendName
      )
    }
  }
]
