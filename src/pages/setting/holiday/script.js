import { defineComponent, computed, watch, reactive, ref } from 'vue'
import { useDefaultForm } from '@/composables/default-form'
import Datepicker from '@vuepic/vue-datepicker'
import {
  get as getHoliday,
  save as saveHoliday
} from '@/api/holiday'
import dayjs from 'dayjs'
import objectSupport from 'dayjs/plugin/objectSupport'

dayjs.extend(objectSupport)

export default defineComponent({
  name: 'SettingHoliday',
  components: {
    Datepicker
  },
  setup () {
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('holiday')

    const initialState = reactive({
      year: null,
      month: null,
      holidays: []
    })
    const params = reactive({ ...initialState })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const yearMonth = computed({
      get () {
        return {
          year: params.year,
          month: params.month
        }
      },
      set (value) {
        params.year = value.year
        params.month = value.month
      }
    })

    const minDate = computed(() => dayjs({
      year: params.year,
      month: params.month
    }).startOf('month').toDate())
    const maxDate = computed(() => dayjs({
      year: params.year,
      month: params.month
    }).endOf('month').toDate())

    watch(yearMonth, (val) => {
      getHoliday(val)
        .then(res => {
          params.holidays = res.data.map(holiday => dayjs(holiday.date).toDate())
        })
    })

    const submit = async () => {
      saveLoading.value = true

      saveHoliday({ ...params })
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

    return {
      params,
      formLoading,
      saveLoading,
      submit,
      yearMonth,
      minDate,
      maxDate
    }
  }
})
