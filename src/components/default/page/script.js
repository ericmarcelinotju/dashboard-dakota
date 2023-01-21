import { defineComponent } from 'vue'
import { DownloadIcon, PlusIcon, UploadIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'DefaultPage',
  components: { DownloadIcon, PlusIcon, UploadIcon },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
})
