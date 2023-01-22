import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import { typeOptions, versionOptions } from '../config'
import components from '@/components'
import {
  detail as getBranch,
  insert as insertBranch,
  update as updateBranch
} from '@/api/branch'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    Loading: components.Loading,
    InputDropdown: components.InputDropdown
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('branch')

    const initialState = {
      number: '',
      name: '',
      host: '',
      port: '',
      type: 'yeastar',
      api_version: 2,
      folder: '',
      username: '',
      password: ''
    }
    const params = reactive({ ...initialState })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const isUpdate = computed(() => !!routeParams.value.id)

    const initPage = () => {
      if (!isUpdate.value) return
      formLoading.value = true
      getBranch(routeParams.value.id)
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
      if (isUpdate.value) {
        updateBranch(routeParams.value.id, { ...params, ...{ id: parseInt(routeParams.value.id) } })
          .then(() => {
            saveSuccess('updated')
          })
          .catch(saveFail)
      } else {
        insertBranch({ ...params })
          .then(() => {
            saveSuccess('inserted')
          })
          .catch(saveFail)
      }
    }

    const saveSuccess = (message) => {
      reset()
      router.push({ path: `${pages.branch.url}` })
      saveLoading.value = false
      showSuccessNotification(message)
    }

    const saveFail = () => {
      showDangerNotification('saved')
      saveLoading.value = false
    }

    onMounted(() => {
      initPage()
    })

    return {
      routeParams,
      isUpdate,
      params,
      formLoading,
      saveLoading,
      submit,
      reset,
      versionOptions,
      typeOptions
    }
  }
})
