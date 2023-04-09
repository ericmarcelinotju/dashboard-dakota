import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import InputDualList from '@/components/form/dualList/index.vue'
import {
  detail as getUser,
  insert as insertUser,
  update as updateUser
} from '@/api/user'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    DefaultTabs: components.DefaultTabs,
    Loading: components.Loading,
    InputDropdown: components.InputDropdown,
    InputDualList
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('user')

    const initialParams = {
      username: null,
      first_name: null,
      last_name: null,
      department: null,
      title: null,
      email: null,
      password: null,
      confirm_password: null,
      role_id: null,
      branches: [],
      extensions: []
    }
    const params = reactive({ ...initialParams })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const roles = ref([])
    const branches = ref([])
    const extensions = ref([])

    const initialFilter = {
      branch_id: ''
    }
    const filter = reactive({ ...initialFilter })

    const extensionOptions = computed(() =>
      extensions.value
        .filter(ext =>
          params.branches.findIndex(branch => branch.id === ext.branch_id) !== -1
        )
        .filter(ext => filter.branch_id ? filter.branch_id === ext.branch_id : true)
    )

    const initPage = () => {
      if (!hasId.value) return
      formLoading.value = true
      getUser(routeParams.value.id)
        .then(res => {
          Object.assign(initialParams, res.data)
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
      Object.assign(params, initialParams)
      Object.assign(filter, initialFilter)
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
    })

    return {
      routeParams,
      hasId,
      params,
      filter,
      formLoading,
      saveLoading,
      submit,
      reset,
      roles,
      branches,
      extensionOptions,
      hasPermission
    }
  }
})
