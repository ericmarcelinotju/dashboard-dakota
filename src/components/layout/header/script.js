import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
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
import { BellIcon, MenuAlt1Icon, UserCircleIcon, LogoutIcon, RefreshIcon } from '@heroicons/vue/outline'
import { useStore } from 'vuex'

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
    UserCircleIcon,
    RefreshIcon
  },
  emits: ['logout', 'notification', 'about', 'openSidebar', 'changeTheater'],
  setup (_, context) {
    const route = useRoute()
    const store = useStore()

    const user = computed(() => store.getters['auth/user'])
    const activeTheater = computed(() => store.getters['auth/theater'])

    const routeName = computed(() => capitalizeWords(route.name))

    const handleLogout = () => {
      context.emit('logout')
    }

    const handleAbout = () => {
      context.emit('about')
    }

    const handleOpenSidebar = () => {
      context.emit('openSidebar')
    }

    const handleChangeTheater = () => {
      context.emit('changeTheater')
    }

    return {
      routeName,
      handleLogout,
      handleAbout,
      handleOpenSidebar,
      handleChangeTheater,
      user,
      activeTheater
    }
  }
})
