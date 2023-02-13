import { pages } from '@/config'

const MemberList = () => import(/* webpackChunkName: 'p-member' */ './list/index.vue')
const MemberCreateEdit = () => import(/* webpackChunkName: 'p-member-create-edit' */ './createEdit/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.member.name,
    component: MemberList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.member.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.member.name + pages.constant.CREATE.appendName,
    component: MemberCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.member.name + pages.constant.CREATE.appendName
      )
    }
  },
  {
    path: pages.constant.EDIT.path,
    name: pages.member.name + pages.constant.EDIT.appendName,
    component: MemberCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.member.name + pages.constant.EDIT.appendName
      )
    }
  }
]
