import { computed, defineComponent, watch, nextTick } from 'vue'
import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  SwitchVerticalIcon,
  TrashIcon
} from '@heroicons/vue/solid'
import { CloudIcon } from '@heroicons/vue/outline'
import Pagination from '@/components/default/pagination/index.vue'
import { app } from '@/config'
import { useDefaultSearch } from '@/composables/default-search'
import { toSimplifiedObjectName } from '@/utils/string'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'DefaultTable',
  components: {
    ArrowSmDownIcon,
    ArrowSmUpIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    CloudIcon,
    PencilIcon,
    SwitchVerticalIcon,
    TrashIcon,
    Pagination
  },
  props: {
    name: {
      type: String,
      default: 'Data'
    },
    fields: {
      type: Array,
      default: () => ([])
    },
    items: {
      type: Array,
      default: () => ([])
    },
    total: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    },
    hasPagination: {
      type: Boolean,
      default: true
    },
    hasSearch: {
      type: Boolean,
      default: true
    },
    hasSelection: {
      type: Boolean,
      default: false
    },
    hasEdit: {
      type: Boolean,
      default: true
    },
    hasDelete: {
      type: Boolean,
      default: true
    },
    isBorderless: {
      type: Boolean,
      default: false
    },
    isClickable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['search', 'selection', 'detail', 'delete', 'edit', 'rowClick'],
  setup(props, context) {
    const router = useRouter()
    let pagination, sort

    if (props.hasPagination) {
      ({ pagination, sort } = useDefaultSearch(context, router))
    } else {
      ({ pagination, sort } = useDefaultSearch(context, null))
    }

    const tableStyle = computed(() => ({ minHeight: `${props.height}px` }))
    const hasItems = computed(() => props.items && props.items.length > 0)

    const filterFields = computed(() => props.fields.filter(field => !field.hidden))

    const getSortingComponent = (field) => {
      if (!field.sortable) return ''
      if (field.value === sort.by) {
        if (sort.direction === 'asc') {
          return 'ArrowSmDownIcon'
        }
        return 'ArrowSmUpIcon'
      }
      return 'SwitchVerticalIcon'
    }

    const setSort = (field, direction) => {
      if (field.sortable) {
        sort.by = field.value
        if (direction) {
          sort.direction = direction
        } else {
          if (sort.by === field.value && sort.direction === 'asc') {
            sort.direction = 'desc'
          } else {
            sort.direction = 'asc'
          }
        }

        // reset to page 1
        pagination.page = 1
      }
    }

    watch(() => filterFields, (val) => {
      nextTick(() => setSort(val.value[0], 'desc'))
    }, { immediate: true })

    const onSelectionInput = (selection) => {
      context.emit('selection', selection.target.checked)
    }

    const onEdit = (item) => {
      context.emit('edit', item)
    }

    const onDelete = (item) => {
      context.emit('delete', item)
    }

    const hasDetail = computed(() => !!context.slots.detail)
    const onToogleDetail = (index, item) => {
      context.emit('detail', { index, item })
    }

    const onRowClick = (item) => {
      context.emit('rowClick', item)
    }

    return {
      itemPerPageOptions: app.itemPerPageOptions,
      pagination,
      sort,
      hasItems,
      tableStyle,
      getSortingComponent,
      setSort,
      onSelectionInput,
      onEdit,
      onDelete,
      toSimplifiedObjectName,
      filterFields,
      hasDetail,
      onToogleDetail,
      onRowClick
    }
  }
})
