import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()

    store.dispatch('auth/logout')

    return {}
  }
})
