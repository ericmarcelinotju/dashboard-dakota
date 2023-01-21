import { pages } from '@/config'

const RecordingList = () => import(/* webpackChunkName: 'p-recording' */ './list/index.vue')
const RecordingCreateEdit = () => import(/* webpackChunkName: 'p-recording-create-edit' */ './createEdit/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.recording.name,
    component: RecordingList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.recording.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.recording.create.name,
    component: RecordingCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.recording.create.name)
    }
  },
  {
    path: pages.constant.EDIT.path,
    name: pages.recording.edit.name,
    component: RecordingCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.recording.edit.name)
    }
  }
]
