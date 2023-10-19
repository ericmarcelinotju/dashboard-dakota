<template>
  <DefaultTable
    :fields="fields"
    :has-delete="false"
    :has-edit="false"
    :items="items"
    :loading="loading"
    :total="itemsTotal"
    @search="handleSearch"
  >
    <template #user="{ item }">
      <span>{{ item.user?.username }}</span>
    </template>
    <template #status="{ item }">
      <span class="default-tag">{{ item.status }}</span>
    </template>
    <template #view="{ item }">
      <div class="action">
        <a @click="handleDetail(item)"> Lihat </a>
      </div>
    </template>
  </DefaultTable>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import components from '@/components'
import { pages } from '@/config'
import { get as getOrders } from '@/api/order'

export default defineComponent({
  components: {
    DefaultTable: components.DefaultTable
  },
  props: {
    userId: {
      type: String,
      default: ''
    },
    isHistory: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const fields = [
      {
        name: 'ID',
        value: 'id',
        hidden: true
      },
      {
        name: 'Tanggal',
        value: 'date',
        sortable: true,
        searchable: true
      },
      {
        name: 'Jam',
        value: 'time'
      },
      {
        name: 'Kode',
        value: 'code'
      },
      {
        name: 'Kategori',
        value: 'category'
      },
      {
        name: 'Total',
        value: 'totalAmount'
      },
      {
        name: 'Pengguna',
        value: 'user'
      },
      {
        name: 'Status',
        value: 'status'
      },
      {
        name: 'Aksi',
        value: 'view'
      }
    ]

    const router = useRouter()
    const store = useStore()

    const statuses = computed(() => props.isHistory ? ['cancelled', 'failed', 'expired', 'settled', 'refunded'] : ['pending'])

    const loading = ref(false)

    const items = ref([])
    const itemsTotal = ref(0)
    const handleSearch = (params) => {
      loading.value = true
      getOrders({
        ...params,
        userId: props.userId,
        statuses: statuses.value
      })
        .then(res => {
          items.value = res.data.data
          itemsTotal.value = res.data.totalItem
        })
        .finally(() => {
          loading.value = false
        })
    }

    onMounted(() => {
      handleSearch({})
    })

    const handleDetail = ({ id }) => {
      router.push({ name: pages.order.detail.name, params: { id } })
    }

    const hasPermission = (action, feature = 'user') => {
      return store.getters['auth/hasPermission'](feature, action)
    }

    return {
      items,
      itemsTotal,
      loading,
      handleSearch,

      fields,

      handleDetail,

      hasPermission
    }
  }
})

</script>
