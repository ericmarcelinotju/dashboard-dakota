import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  detail as getPermission,
  insert as insertPermission,
  update as updatePermission
} from '@/api/permission'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    Loading: components.Loading,
    InputDropdown: components.InputDropdown
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('permission')

    const initialState = {
      method: '',
      module: '',
      description: ''
    }
    const params = reactive({ ...initialState })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)
    // const methods = ['GET', 'POST', 'PUT', 'DELETE']
    const methods = [
      {
        name: 'GET',
        id: 'GET'
      },
      {
        name: 'POST',
        id: 'POST'
      },
      {
        name: 'PUT',
        id: 'PUT'
      },
      {
        name: 'DELETE',
        id: 'DELETE'
      }
    ]

    const initPage = () => {
      if (!hasId.value) return
      formLoading.value = true
      getPermission(routeParams.value.id)
        .then(res => {
          Object.assign(initialState, res.data)
          Object.assign(params, res.data)
          formLoading.value = false
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
        updatePermission(routeParams.value.id, params)
          .then(() => {
            saveSuccess('updated')
          })
          .catch(() => {
            showDangerNotification('update')
          })
          .finally(() => {
            saveLoading.value = false
          })
      } else {
        insertPermission(params)
          .then(() => {
            saveSuccess('inserted')
          })
          .catch(() => {
            showDangerNotification('insert')
          })
          .finally(() => {
            saveLoading.value = false
          })
      }
    }

    const saveSuccess = (message) => {
      reset()
      router.push({ path: `${pages.permission.url}` })
      showSuccessNotification(message)
    }

    onMounted(() => {
      initPage()
    })

    return {
      routeParams,
      hasId,
      params,
      formLoading,
      saveLoading,
      submit,
      reset,
      methods
    }
  }
})
