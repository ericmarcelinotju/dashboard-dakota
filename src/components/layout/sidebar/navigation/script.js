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

    const hasPermission = (feature) => {
      return store.getters['auth/hasPermission'](feature, 'read')
    }

    const hasAnyPermission = (children) => {
      for (const item of children) {
        if (store.getters['auth/hasPermission'](item.module, 'read')) {
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
