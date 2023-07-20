import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Datepicker from '@vuepic/vue-datepicker'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import Transaction from './Transaction.vue'
import {
  detail as getUser,
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
    InputDropdown: components.InputDropdown,
    InputAvatar: components.InputAvatar,
    Transaction,
    Datepicker
  },
  setup () {
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
      roleId: null
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
      const formData = convertJsonToFormData({
        ...params,
        dob: params.dob.toISOString()
      })
      if (hasId.value) {
        updateUser(
          routeParams.value.id,
          formData
        )
          .then(() => {
            reset()
            router.push({ path: `${pages.member.url}` })
            showSuccessNotification('updated')
          })
          .catch(err => {
            showDangerNotification('saved', err.response.data)
          })
          .finally(() => {
            saveLoading.value = false
          })
      } else {
        insertUser(formData)
          .then(() => {
            reset()
            router.push({ path: `${pages.member.url}` })
            showSuccessNotification('inserted')
          })
          .catch(err => {
            showDangerNotification('saved', err.response.data)
          })
          .finally(() => {
            saveLoading.value = false
          })
      }
    }

    const hasPermission = (method, module = 'USER') => {
      return store.getters['auth/hasPermission'](module, method)
    }

    const tabOptions = computed(() => {
      if (hasId.value) {
        return [
          { label: 'Profil Pengguna', value: 'profile' },
          { label: 'Transaksi Aktif', value: 'active_transaction' },
          { label: 'Riwayat Transaksi', value: 'history_transaction' },
          { label: 'DC Point', value: 'point' },
          { label: 'Sisa Deposit', value: 'deposit' }
        ]
      }
      return [{ label: 'Profil Pengguna', value: 'profile' }]
    })

    onMounted(() => {
      initPage()
      if (hasPermission('GET', 'ROLE')) {
        getRoles({
          filter: 'isCustomer:true'
        })
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
      hasPermission,
      tabOptions
    }
  }
})
