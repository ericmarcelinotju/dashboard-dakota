import { onMounted, reactive, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { updateQuery } from '@/composables/update-query'
import { app } from '@/config'
import { debounce } from '@/utils/timing'

const params = reactive({})

const pagination = reactive({
  page: 1,
  limit: app.itemPerPageOptions[0]
})

const sort = reactive({
  by: undefined,
  direction: undefined
})

const useDefaultSearch = (context, router) => {
  const route = useRoute()

  const checkRouteQuery = () => {
    pagination.page = parseInt(route.query.page || 1)
    pagination.limit = parseInt(route.query.limit || app.itemPerPageOptions[0])

    let sortBy
    let sortDirection = 'asc'
    if (!!route.query.sort && route.query.sort.includes(':')) {
      const sort = route.query.sort.split(':')
      if (sort[0].length > 0) {
        sortBy = sort[0]
      }
      if (sort[1] === 'asc' || sort[1] === 'desc') {
        sortDirection = sort[1]
      }
    }
    sort.by = sortBy
    sort.direction = sortDirection

    for (const key in route.query) {
      if (key === 'page' || key === 'limit' || key === 'sort') {
        continue
      }
      const param = route.query[key]
      if (param !== null && param !== undefined) {
        const paramStr = param.toString()
        if (paramStr.length > 0) {
          params[key] = paramStr
        }
      }
    }
  }

  const onQueryChange = (isSubmit = true) => debounce(() => {
    // Filter out empty values from parameters
    const filteredParams = {}
    for (const key in params) {
      if (key === 'page' || key === 'limit' || key === 'sort') {
        continue
      }
      const param = params[key]
      if (param !== null && param !== undefined) {
        const paramStr = param.toString()
        if (paramStr.length > 0) {
          filteredParams[key] = paramStr
        }
      }
    }

    // Combine parameters with pagination and sort
    const searchParams = {
      page: pagination.page,
      limit: pagination.limit,
      ...filteredParams
    }
    if (sort.by && sort.by.length > 0) {
      searchParams.sort = `${sort.by}:${sort.direction}`
    }

    if (isSubmit) {
      updateQuery(router, searchParams)
      context.emit('search', searchParams)
    }
  })

  watch([pagination, sort], onQueryChange())
  watch(params, onQueryChange(false))

  const initSearch = (defaultParams) => {
    Object.assign(params, {
      ...defaultParams,
      ...params
    })
  }

  const resetSearch = () => {
    for (const key in params) {
      params[key] = null
    }

    Object.assign(pagination, {
      page: 1,
      limit: app.itemPerPageOptions[0]
    })

    Object.assign(sort, {
      by: undefined,
      direction: undefined
    })
  }


  onMounted(() => {
    checkRouteQuery()
  })

  onBeforeUnmount(() => {
    resetSearch()
  })

  return {
    pagination,
    sort,
    params,
    initSearch,
    submitSearch: onQueryChange()
  }
}

export {
  useDefaultSearch
}
