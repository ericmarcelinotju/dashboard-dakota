import { defineComponent, onMounted, computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useDefaultForm } from '@/composables/default-form'
import { app } from '@/config'
import { testEmail as testEmailSetting } from '@/api/setting'
import components from '@/components'
import VueDatepicker from '@vuepic/vue-datepicker'

const objectName = app.setting.name

export default defineComponent({
  name: 'Setting',
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    DefaultTabs: components.DefaultTabs,
    Loading: components.Loading,
    VueDatepicker
  },
  setup() {
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm(objectName)

    const initialState = reactive({})
    const params = reactive({})
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const tabOption = ref('scheduler')

    const firstBackupTime = computed({
      get() {
        if (params.first_backup_time) {
          const firstBackupTimeStrs = params.first_backup_time.split(':')
          return {
            hours: firstBackupTimeStrs[0],
            minutes: firstBackupTimeStrs[1]
          }
        }
        return null
      },
      set(value) {
        params.first_backup_time = `${value.hours.toString().padStart(2, '0')}:${value.minutes.toString().padStart(2, '0')}`
      }
    })

    const secondBackupTime = computed({
      get() {
        if (params.second_backup_time) {
          const secondBackupTimeStrs = params.second_backup_time.split(':')
          return {
            hours: secondBackupTimeStrs[0],
            minutes: secondBackupTimeStrs[1]
          }
        }
        return null
      },
      set(value) {
        params.second_backup_time = `${value.hours.toString().padStart(2, '0')}:${value.minutes.toString().padStart(2, '0')}`
      }
    })

    const initPage = () => {
      formLoading.value = true
      store.dispatch('setting/getSettings')
        .then(() => {
          const settings = store.getters['setting/settings']
          Object.assign(initialState, settings)
          Object.assign(params, initialState)
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

    const submit = async () => {
      saveLoading.value = true

      store.dispatch('setting/saveSettings', { ...params })
        .then(() => {
          showSuccessNotification('save')
        })
        .catch(() => {
          showDangerNotification('save')
        })
        .finally(() => {
          saveLoading.value = false
        })
    }

    const onChangeOption = (option) => {
      tabOption.value = option
    }

    onMounted(() => {
      initPage()
    })

    const testEmailParams = reactive({
      email: null
    })
    const testEmailLoading = ref(false)
    const testEmail = () => {
      testEmailLoading.value = true
      testEmailSetting(testEmailParams.email)
        .then(() => {
          showSuccessNotification('email')
        })
        .catch(() => {
          showDangerNotification('email')
        })
        .finally(() => {
          testEmailLoading.value = false
        })
    }


    return {
      params,
      formLoading,
      saveLoading,
      submit,
      reset,
      firstBackupTime,
      secondBackupTime,
      tabOption,
      onChangeOption,

      testEmailParams,
      testEmailLoading,
      testEmail
    }
  }
})
