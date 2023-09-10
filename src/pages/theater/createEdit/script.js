import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Datepicker from '@vuepic/vue-datepicker'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  detail as getTheater,
  insert as insertTheater,
  update as updateTheater
} from '@/api/theater'
import { convertJsonToFormData } from '@/utils/body'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    Loading: components.Loading,
    InputDropdown: components.InputDropdown,
    InputImage: components.InputImage,
    InputMultitext: components.InputMultitext,
    Datepicker
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('theater')

    const initialState = {
      code: null,
      name: null,
      image: null,
      street: null,
      city: null,
      province: null,
      zipCode: null,
      phone: null,
      bankName: null,
      bankAccount: null,
      aCName: null,
      mapUrl: null,
      databaseName: null
    }
    const params = reactive({ ...initialState })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const isUpdate = computed(() => !!routeParams.value.id)

    const initPage = () => {
      if (!isUpdate.value) return
      formLoading.value = true
      getTheater(routeParams.value.id)
        .then(res => {
          Object.assign(initialState, res.data)
          Object.assign(params, res.data)
        })
        .catch(err => {
          showDangerNotification('loaded', err?.response?.data)
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

      const payload = convertJsonToFormData(params)
      if (isUpdate.value) {
        updateTheater(routeParams.value.id, payload)
          .then(() => {
            saveSuccess('updated')
          })
          .catch(saveFail)
      } else {
        insertTheater(payload)
          .then(() => {
            saveSuccess('inserted')
          })
          .catch(saveFail)
      }
    }

    const saveSuccess = (message) => {
      reset()
      router.push({ path: `${pages.theater.url}` })
      saveLoading.value = false
      showSuccessNotification(message)
    }

    const saveFail = (err) => {
      showDangerNotification('saved', err?.response?.data)
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
      reset
    }
  }
})
