import { defineComponent } from 'vue'
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'DefaultPagination',
  components: {
    ArrowNarrowLeftIcon,
    ArrowNarrowRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    currentTotal: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 10
    },
    pageRange: {
      type: Number,
      default: 2
    },
    textBeforeInput: {
      type: String,
      default: 'Go to page'
    },
    textAfterInput: {
      type: String,
      default: 'Go'
    }
  },
  emits: ['page-changed'],
  data () {
    return {
      input: ''
    }
  },
  computed: {
    pages () {
      const pages = []
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i)
      }
      return pages
    },
    rangeStart () {
      const start = this.current - this.pageRange
      return (start > 0) ? start : 1
    },
    rangeEnd () {
      const end = this.current + this.pageRange
      return (end < this.totalPages) ? end : this.totalPages
    },
    totalPages () {
      return Math.ceil(this.total / this.perPage)
    },
    nextPage () {
      return this.current + 1
    },
    prevPage () {
      return this.current - 1
    },
    hasFirst () {
      return this.rangeStart !== 1
    },
    hasLast () {
      return this.rangeEnd < this.totalPages
    },
    hasPrev () {
      return this.current > 1
    },
    hasNext () {
      return this.current < this.totalPages
    }
  },
  methods: {
    changePage (page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit('page-changed', page)
      }
    }
  }
})
