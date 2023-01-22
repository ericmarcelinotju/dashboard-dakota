import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import VueDatepicker from '@vuepic/vue-datepicker'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import { format, isValid, parseDuration } from '@/utils/date'
import { convertJsonToFormData } from '@/utils/body'
import { get as getBranches } from '@/api/branch'
import { get as getExtensions } from '@/api/extension'
import {
  detail as getRecording,
  insert as insertRecording,
  update as updateRecording
} from '@/api/recording'
import { statusOptions, typeOptions } from '../config'

export default defineComponent({
  components: {
    VueDatepicker,
    DefaultCreateEdit: components.DefaultCreateEdit,
    InputAudio: components.InputAudio,
    InputDropdown: components.InputDropdown,
    Loading: components.Loading
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('recording')

    const initialState = {
      call_id: null,
      branch_id: null,
      start_time: null,
      call_duration: 0,
      talk_duration: 0,
      src_trunk_name: null,
      dst_trunk_name: null,
      status: null,
      type: null,
      pin_code: null,
      did_number: null,
      serial_number: null,
      call_from_number: null,
      call_to_number: null,
      recording: null
    }
    const params = reactive({ ...initialState })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const startTime = computed({
      get() {
        return params.start_time
      },
      set(value) {
        if (isValid(value)) {
          params.start_time = format(value)
        } else {
          params.start_time = null
        }
      }
    })

    const initPage = async () => {
      if (!hasId.value) return
      formLoading.value = true

      try {
        const res = await getRecording(routeParams.value.id)

        const recording = {
          ...res.data,
          start_time: format(res.data.start_time),
          call_duration: parseDuration(res.data.call_duration),
          talk_duration: parseDuration(res.data.talk_duration)
        }

        if (res.data.recording && !res.data.error) {
          const recordingBlob = await store.dispatch('recording/downloadRecording', routeParams.value.id)

          recording.recording = new File([recordingBlob], res.data.recording)
        }

        Object.assign(initialState, recording)
        Object.assign(params, recording)
      } catch {
        showDangerNotification('loaded')
      }
      formLoading.value = false
    }

    const reset = () => {
      Object.assign(params, initialState)
    }

    const submit = () => {
      saveLoading.value = true
      if (hasId.value) {
        updateRecording(
          routeParams.value.id,
          convertJsonToFormData(params)
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
        insertRecording(convertJsonToFormData(params))
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
      router.push({ path: `${pages.recording.url}` })
      showSuccessNotification(message)
    }

    const branches = ref([])
    const extensions = ref([])
    const trunks = computed(() => store.getters['recording/trunks'](params.branch_id).map(trunk => ({ label: trunk, value: trunk })))

    const onBranchChange = () => {
      getExtensions({ branch_id: params.branch_id })
        .then(res => {
          extensions.value = res.data.extensions
        })
      store.dispatch('recording/getTrunks', params.branch_id)
    }

    onMounted(() => {
      initPage()

      getBranches()
        .then(res => {
          branches.value = res.data.branches
        })
    })

    const onUploadRecording = () => {
      params.talk_duration = params.recording.duration
    }

    return {
      routeParams,
      hasId,
      params,
      formLoading,
      saveLoading,
      submit,
      reset,
      startTime,
      statusOptions,
      typeOptions,
      branches,
      onBranchChange,
      extensions,
      trunks,
      onUploadRecording
    }
  }
})
