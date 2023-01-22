import { pages } from '@/config'

const ProductList = () => import(/* webpackChunkName: 'p-product' */ './list/index.vue')
const ProductCreateEdit = () => import(/* webpackChunkName: 'p-product-create-edit' */ './createEdit/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.product.name,
    component: ProductList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.product.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.product.name + pages.constant.CREATE.appendName,
    component: ProductCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.product.name + pages.constant.CREATE.appendName
      )
    }
  },
  {
    path: pages.constant.EDIT.path,
    name: pages.product.name + pages.constant.EDIT.appendName,
    component: ProductCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.product.name + pages.constant.EDIT.appendName
      )
    }
  }
]
