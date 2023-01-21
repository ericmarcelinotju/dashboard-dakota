import { pages } from '@/config'

const BranchList = () => import(/* webpackChunkName: 'p-branch' */ './list/index.vue')
const BranchCreateEdit = () => import(/* webpackChunkName: 'p-branch-create-edit' */ './createEdit/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.branch.name,
    component: BranchList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.branch.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.branch.create.name,
    component: BranchCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.branch.create.name
      )
    }
  },
  {
    path: pages.constant.EDIT.path,
    name: pages.branch.edit.name,
    component: BranchCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.branch.edit.name
      )
    }
  }
]
