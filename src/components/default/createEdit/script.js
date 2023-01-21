import { defineComponent } from 'vue'
import { XIcon } from '@heroicons/vue/solid'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'DefaultCreateEdit',
  components: {
    XIcon
  },
  props: {
    hasBack: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup () {
    const router = useRouter()

    const back = () => {
      router.back()
    }

    return {
      back
    }
  }
})
