import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { capitalizeWords } from '@/utils/string'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel
} from '@headlessui/vue'
import { ChevronDownIcon, SearchIcon } from '@heroicons/vue/solid'
import { BellIcon, MenuAlt1Icon, UserCircleIcon, LogoutIcon } from '@heroicons/vue/outline'
import { useStore } from 'vuex'
import { get as getLogs } from '@/api/log'
import { pages } from '@/config'

export default defineComponent({
  name: 'HeaderLayout',
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverPanel,
    BellIcon,
    ChevronDownIcon,
    MenuAlt1Icon,
    SearchIcon,
    LogoutIcon,
    UserCircleIcon
  },
  emits: ['logout', 'notification', 'about'],
  setup(_, context) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const user = computed(() => store.getters['auth/user'])

    const routeName = computed(() => capitalizeWords(route.name))

    const handleLogout = () => {
      context.emit('logout')
    }

    const handleAbout = () => {
      context.emit('about')
    }

    const notifications = ref([])
    const getNotifications = () => {
      if (hasPermission('GET')) {
        getLogs({
          level: 'danger'
        })
          .then(res => {
            notifications.value = res.data.logs
          })
      }
    }
    onMounted(() => {
      getNotifications()
    })

    const handleEventLog = () => {
      router.push({ name: pages.log.event.name })
    }
    const handleSystemLog = () => {
      router.push({ name: pages.log.system.name })
    }

    const hasPermission = (method, module = 'LOG') => {
      return store.getters['auth/hasPermission'](module, method)
    }

    return {
      routeName,
      handleLogout,
      handleAbout,
      user,
      notifications,
      getNotifications,
      handleEventLog,
      handleSystemLog,
      hasPermission
    }
  }
})
