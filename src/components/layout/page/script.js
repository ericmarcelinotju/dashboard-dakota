import { defineComponent } from 'vue'
import { DownloadIcon, PlusIcon, UploadIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'PageLayout',
  components: { DownloadIcon, PlusIcon, UploadIcon },
  props: {
    hasCreate: {
      type: Boolean,
      default: true
    },
    hasImport: {
      type: Boolean,
      default: false
    },
    hasExport: {
      type: Boolean,
      default: false
    }
  },
  setup (_, context) {
    const submitAction = (type = 'default') => {
      context.emit(type)
    }
    return {
      submitAction
    }
  }
})
