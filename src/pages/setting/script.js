import { defineComponent } from 'vue'
import components from '@/components'
import SettingHoliday from './holiday/index.vue'

export default defineComponent({
  name: 'Setting',
  components: {
    SettingHoliday,
    DefaultCreateEdit: components.DefaultCreateEdit,
    DefaultTabs: components.DefaultTabs
  },
  setup () {
    return {}
  }
})
