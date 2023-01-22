import { pages } from '@/config'

const TaxList = () => import(/* webpackChunkName: 'p-tax' */ './list/index.vue')
const TaxCreateEdit = () => import(/* webpackChunkName: 'p-tax-create-edit' */ './createEdit/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.tax.name,
    component: TaxList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.tax.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.tax.name + pages.constant.CREATE.appendName,
    component: TaxCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.tax.name + pages.constant.CREATE.appendName
      )
    }
  },
  {
    path: pages.constant.EDIT.path,
    name: pages.tax.name + pages.constant.EDIT.appendName,
    component: TaxCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.tax.name + pages.constant.EDIT.appendName
      )
    }
  }
]
