import { computed, defineComponent, onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  insert as insertUser,
  update as updateUser
} from '@/api/user'
import { get as getRoles } from '@/api/role'
import { convertJsonToFormData } from '@/utils/body'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    DefaultTabs: components.DefaultTabs,
    Loading: components.Loading,
    InputAvatar: components.InputAvatar,
    InputDropdown: components.InputDropdown
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('user')

    const params = reactive(props.user)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const roles = ref([])

    const submit = () => {
      saveLoading.value = true
      const payload = convertJsonToFormData(params)
      if (hasId.value) {
        updateUser(routeParams.value.id, payload)
          .then(() => {
            router.push({ path: `${pages.staff.url}` })
            showSuccessNotification('updated')
          })
          .catch(() => {
            showDangerNotification('saved')
          })
          .finally(() => {
            saveLoading.value = false
          })
      } else {
        insertUser(payload)
          .then(() => {
            router.push({ path: `${pages.staff.url}` })
            showSuccessNotification('inserted')
          })
          .catch(() => {
            showDangerNotification('saved')
          })
          .finally(() => {
            saveLoading.value = false
          })
      }
    }

    const hasPermission = (action, feature = 'user') => {
      return store.getters['auth/hasPermission'](feature, action)
    }

    const tabOptions = computed(() => {
      return [
        { label: 'Profil Pengguna', value: 'profile' },
        { label: 'Theater Kerja', value: 'workin' }
      ]
    })

    onMounted(() => {
      if (hasPermission('read', 'role')) {
        getRoles()
          .then(res => {
            roles.value = res.data.data
          })
      }
    })

    return {
      routeParams,
      hasId,
      params,
      saveLoading,
      submit,
      roles,
      hasPermission,
      tabOptions
    }
  }
})
