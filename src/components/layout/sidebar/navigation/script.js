import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

export default defineComponent({
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel
  },
  props: {
    navigation: {
      type: Array,
      default: () => ([])
    }
  },
  setup () {
    const route = useRoute()
    const store = useStore()

    const hasActiveChild = (children) => {
      return children.some((item) => item.href === route.path)
    }

    const hasPermission = (module) => {
      return store.getters['auth/hasPermission'](module, 'GET')
    }

    const hasAnyPermission = (children) => {
      for (const item of children) {
        if (store.getters['auth/hasPermission'](item.module, 'GET')) {
          return true
        }
      }
      return false
    }

    return {
      hasActiveChild,
      hasPermission,
      hasAnyPermission
    }
  }
})
