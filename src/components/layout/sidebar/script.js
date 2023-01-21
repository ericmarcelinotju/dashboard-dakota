import { defineComponent } from 'vue'
import { XIcon } from '@heroicons/vue/outline'
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import { navigations } from './config'
import DefaultNavigation from './navigation/index.vue'

export default defineComponent({
  components: {
    DefaultNavigation,
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    XIcon
  },
  props: {
    sidebarOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(_, context) {
    const close = () => {
      context.emit('close')
    }

    return {
      navigations,
      close
    }
  }
})
