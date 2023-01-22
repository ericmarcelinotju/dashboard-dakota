import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  detail as getUser,
  insert as insertUser,
  update as updateUser
} from '@/api/user'
import { get as getRoles } from '@/api/role'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    DefaultTabs: components.DefaultTabs,
    Loading: components.Loading,
    InputDropdown: components.InputDropdown,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('user')

    const initialParams = {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      roleId: null,
    }
    const params = reactive({ ...initialParams })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const roles = ref([])

    const initPage = () => {
      if (!hasId.value) return
      formLoading.value = true
      getUser(routeParams.value.id)
        .then(res => {
          const data = {
            ...res.data,
            roleId: res.data.role.id
          }
          Object.assign(initialParams, data)
          Object.assign(params, data)
        })
        .catch(() => {
          showDangerNotification('loaded')
        })
        .finally(() => {
          formLoading.value = false
        })
    }

    const reset = () => {
      Object.assign(params, initialParams)
    }

    const submit = () => {
      saveLoading.value = true
      if (hasId.value) {
        updateUser(routeParams.value.id, { ...params, ...{ user_id: routeParams.value.id }, ...{ role_id: params.role_id } })
          .then(() => {
            reset()
            router.push({ path: `${pages.user.url}` })
            showSuccessNotification('updated')
          })
          .catch(() => {
            showDangerNotification('saved')
          })
          .finally(() => {
            saveLoading.value = false
          })
      } else {
        insertUser({ ...params })
          .then(() => {
            reset()
            router.push({ path: `${pages.user.url}` })
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

    const hasPermission = (method, module = 'USER') => {
      return store.getters['auth/hasPermission'](module, method)
    }

    onMounted(() => {
      initPage()
      if (hasPermission('GET', 'ROLE')) {
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
      formLoading,
      saveLoading,
      submit,
      reset,
      roles,
      hasPermission
    }
  }
})
