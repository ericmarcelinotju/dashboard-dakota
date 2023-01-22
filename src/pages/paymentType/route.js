import { pages } from '@/config'

const PaymentTypeList = () => import(/* webpackChunkName: 'p-paymentType' */ './list/index.vue')
const PaymentTypeCreateEdit = () => import(/* webpackChunkName: 'p-paymentType-create-edit' */ './createEdit/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.paymentType.name,
    component: PaymentTypeList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.paymentType.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.paymentType.name + pages.constant.CREATE.appendName,
    component: PaymentTypeCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.paymentType.name + pages.constant.CREATE.appendName
      )
    }
  },
  {
    path: pages.constant.EDIT.path,
    name: pages.paymentType.name + pages.constant.EDIT.appendName,
    component: PaymentTypeCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.paymentType.name + pages.constant.EDIT.appendName
      )
    }
  }
]
