<template>
  <DefaultTable
    :fields="fields"
    :has-delete="false"
    :has-edit="false"
    :items="items"
    :loading="loading"
    :total="itemsTotal"
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
import { defineComponent, reactive, ref, onMounted } from 'vue'
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

    const loading = ref(false)
    let stateParams = reactive({
      userId: props.userId,
      types: props.isHistory ? ['pending'] : ['cancelled', 'failed', 'expired']
    })

    const items = ref([])
    const itemsTotal = ref(0)
    const handleSearch = (params) => {
      stateParams = { ...params }
      loading.value = true
      getOrders(params)
        .then(res => {
          items.value = res.data.data
          itemsTotal.value = res.data.totalItem
        })
        .finally(() => {
          loading.value = false
        })
    }

    onMounted(() => {
      handleSearch(stateParams)
    })

    const handleDetail = ({ id }) => {
      router.push({ name: pages.order.detail.name, params: { id } })
    }

    const hasPermission = (method, module = 'USER') => {
      return store.getters['auth/hasPermission'](module, method)
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
