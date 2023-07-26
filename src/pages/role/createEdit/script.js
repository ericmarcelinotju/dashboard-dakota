import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  detail as getRole,
  insert as insertRole,
  update as updateRole
} from '@/api/role'
import {
  get as getPermissions
} from '@/api/permission'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    DefaultTabs: components.DefaultTabs,
    Loading: components.Loading
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('role')

    const initialState = {
      name: '',
      description: '',
      permissions: []
    }
    const params = reactive({ ...initialState })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)
    const permissions = ref([])

    const mappedPermissions = computed(() => {
      if (!permissions.value) {
        return []
      }
      const mappedPermissions = {}
      permissions.value.forEach(permission => {
        if (!mappedPermissions[permission.feature]) mappedPermissions[permission.feature] = {}
        mappedPermissions[permission.feature][permission.action] = permission
      })
      const arrayPermissions = []
      Object.keys(mappedPermissions).forEach(feature => {
        arrayPermissions.push({
          name: feature,
          permissions: mappedPermissions[feature]
        })
      })
      return arrayPermissions
    })

    const initPage = () => {
      if (!hasId.value) return
      formLoading.value = true
      getRole(routeParams.value.id)
        .then(res => {
          Object.assign(initialState, res.data)
          Object.assign(params, res.data)
        })
        .catch(() => {
          showDangerNotification('loaded')
        })
        .finally(() => {
          formLoading.value = false
        })
    }

    const reset = () => {
      Object.assign(params, initialState)
    }

    const submit = () => {
      saveLoading.value = true
      if (hasId.value) {
        updateRole(
          routeParams.value.id,
          {
            ...params,
            id: parseInt(routeParams.value.id),
            permissionIds: params.permissions.map(item => item.id)
          }
        )
          .then(() => {
            saveSuccess('updated')
          })
          .catch(() => {
            showDangerNotification('saved')
          })
          .finally(() => {
            saveLoading.value = false
          })
      } else {
        insertRole({
          ...params,
          permissionIds: params.permissions.map(item => item.id)
        })
          .then(() => {
            saveSuccess('inserted')
          })
          .catch(() => {
            showDangerNotification('saved')
          })
          .finally(() => {
            saveLoading.value = false
          })
      }
    }

    const saveSuccess = (message) => {
      reset()
      router.push({ path: `${pages.role.url}` })
      showSuccessNotification(message)
    }

    onMounted(() => {
      initPage()
      getPermissions()
        .then(res => {
          permissions.value = res.data.data
        })
    })

    return {
      routeParams,
      hasId,
      params,
      formLoading,
      saveLoading,
      submit,
      reset,
      permissions,
      mappedPermissions
    }
  }
})
