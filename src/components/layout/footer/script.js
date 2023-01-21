import { defineComponent, ref } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { useI18n } from 'vue-i18n'
import { getLocalStorageData, setLocalStorageData } from '@/utils/storage'

export default defineComponent({
  name: 'FooterLayout',
  components: {
    Switch,
    SwitchGroup,
    SwitchLabel
  },
  setup () {
    const i18n = useI18n()
    const enabled = ref(getLocalStorageData('locale') === 'id')

    const switchLanguage = () => {
      if (enabled.value) {
        i18n.locale = 'id'
      } else {
        i18n.locale = 'en'
      }
      setLocalStorageData('locale', i18n.locale)
      window.location.reload()
    }

    return {
      enabled,
      switchLanguage
    }
  }
})
