import { defineComponent } from 'vue'
import { ViewGridIcon } from '@heroicons/vue/solid'
import { navigations } from './config'
import DefaultNavigation from './navigation/index.vue'

export default defineComponent({
  name: 'SidebarLayout',
  components: {
    DefaultNavigation,
    ViewGridIcon
  },
  setup () {
    return {
      navigations
    }
  }
})
