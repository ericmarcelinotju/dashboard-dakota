import { ref, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import components from '@/components'
import DefaultHeader from './../header/index.vue'
import DefaultFooter from './../footer/index.vue'
import DefaultSidebar from './../sidebar/index.vue'
import store from '@/store'
import { pages } from '@/config'

export default defineComponent({
  name: 'ContainerLayout',
  components: {
    DefaultFooter: DefaultFooter,
    DefaultHeader: DefaultHeader,
    DefaultSidebar: DefaultSidebar,
    DefaultModal: components.DefaultModal
  },
  setup () {
    const route = useRoute()

    const visibleNotificationModal = ref(false)
    const currNotification = ref({})

    const handleLogout = () => {
      store.dispatch('auth/logout')
    }

    const handleNotification = (notification) => {
      visibleNotificationModal.value = true
      currNotification.value = notification
      store.commit('notification/readNotification', notification.id)
    }

    const handleAbout = () => {
      window.open(pages.about, '_blank').focus()
    }

    return {
      route,
      handleLogout,
      handleNotification,
      handleAbout,
      visibleNotificationModal,
      currNotification
    }
  }
})
