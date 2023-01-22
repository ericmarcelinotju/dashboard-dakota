import { pages } from '@/config'

const MovieList = () => import(/* webpackChunkName: 'p-movie' */ './list/index.vue')
const MovieCreateEdit = () => import(/* webpackChunkName: 'p-movie-create-edit' */ './createEdit/index.vue')

export default [
  {
    path: pages.constant.INDEX.path,
    name: pages.movie.name,
    component: MovieList,
    meta: {
      auth: true,
      title: pages.getAppTitle(pages.movie.name)
    }
  },
  {
    path: pages.constant.CREATE.path,
    name: pages.movie.create.name,
    component: MovieCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.movie.create.name
      )
    }
  },
  {
    path: pages.constant.EDIT.path,
    name: pages.movie.edit.name,
    component: MovieCreateEdit,
    meta: {
      auth: true,
      title: pages.getAppTitle(
        pages.movie.edit.name
      )
    }
  }
]
