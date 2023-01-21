import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { app, pages } from '@/config'
import { useViewDetail } from '@/composables/view-detail'

import components from '@/components'

export default defineComponent({
  components: {
    CustomDetail: components.CustomDetail,
    Loading: components.Loading
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { loading, data } = useViewDetail(route, store, app.user.name)

    const handleViewRole = (id) => {
      router.push({ path: `${pages.role.url}/${id}/detail` })
    }

    const handleViewManagement = (id) => {
      router.push({ path: `${pages.management.url}/${id}/detail` })
    }

    const hasPermission = (method, module = 'USER') => {
      return store.getters['auth/hasPermission'](module, method)
    }

    return {
      loading,
      data,
      handleViewRole,
      handleViewManagement,
      hasPermission
    }
  }
})
