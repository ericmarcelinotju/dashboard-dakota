import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDefaultForm } from '@/composables/default-form'
import components from '@/components'
import { detail as getUser } from '@/api/user'
import UserForm from './user/index.vue'
import WorkForm from './work/index.vue'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    DefaultTabs: components.DefaultTabs,
    UserForm,
    WorkForm
  },
  setup () {
    const route = useRoute()
    const { showDangerNotification } = useDefaultForm('user')

    const params = reactive({})
    const loading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const roles = ref([])

    const initPage = () => {
      if (!hasId.value) return
      loading.value = true
      getUser(routeParams.value.id)
        .then(res => {
          const data = {
            ...res.data,
            roleId: res.data.role.id
          }
          Object.assign(params, data)
        })
        .catch(err => {
          showDangerNotification('loaded', err?.response?.data)
        })
        .finally(() => {
          loading.value = false
        })
    }

    onMounted(() => {
      initPage()
    })

    return {
      routeParams,
      hasId,
      params,
      loading,
      roles
    }
  }
})
