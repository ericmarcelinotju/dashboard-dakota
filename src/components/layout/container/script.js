import { onMounted, computed, ref, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import components from '@/components'
import DefaultHeader from './../header/index.vue'
import DefaultFooter from './../footer/index.vue'
import DefaultSidebar from './../sidebar/index.vue'
import store from '@/store'
import { pages } from '@/config'
import { get as getTheaters } from '@/api/theater'

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

    const sidebarOpen = ref(false)
    const handleOpenSidebar = () => {
      sidebarOpen.value = true
    }
    const handleCloseSidebar = () => {
      sidebarOpen.value = false
    }

    const handleAbout = () => {
      window.open(pages.about, '_blank').focus()
    }

    const initTheaters = () => {
      getTheaters()
        .then(resp => {
          theaters.value = resp.data.data
        })
    }

    const visibleChangeTheaterModal = ref(false)
    const theaters = ref([])
    const activeTheater = computed({
      get () {
        return store.getters['auth/theater']
      },
      set (newValue) {
        store.commit('auth/setTheater', newValue)
      }
    })

    const handleChangeTheater = () => {
      visibleChangeTheaterModal.value = true
    }

    onMounted(() => {
      initTheaters()

      if (!activeTheater.value) {
        handleChangeTheater()
      }
    })

    return {
      route,
      handleLogout,
      handleNotification,
      sidebarOpen,
      handleOpenSidebar,
      handleCloseSidebar,
      handleAbout,
      handleChangeTheater,
      visibleNotificationModal,
      currNotification,
      visibleChangeTheaterModal,
      theaters,
      activeTheater
    }
  }
})
