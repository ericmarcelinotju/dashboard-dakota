import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import components from '@/components'
import { branchFields } from './config'
import { pages } from '@/config'
import { dashboard as getDashboardStat } from '@/api/stat'
import { get as getBranches } from '@/api/branch'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    DefaultTable: components.DefaultTable,
    InputSwitch: components.InputSwitch
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    const branchParams = reactive({
      is_online: false
    })
    const branchLoading = ref(false)
    const branches = ref([])
    const totalBranches = ref(0)
    const fetchBranch = () => {
      branchLoading.value = true
      getBranches(branchParams)
        .then(res => {
          branches.value = res.data.branches
          totalBranches.value = res.data.total
        })
        .finally(() => {
          branchLoading.value = false
        })
    }
    watch(branchParams, fetchBranch)
    const onBranchClick = (branch) => {
      router.push({ name: pages.recording.name, query: { branch_id: branch.id } })
    }

    const extensionLoading = ref(false)
    const totalExtensions = ref(0)

    const recordingLoading = ref(false)
    const totalRecordings = ref(0)

    const loggedInUserLoading = ref(false)
    const totalLoggedInUsers = ref(0)

    onMounted(() => {
      if (hasPermission('BRANCH')) {
        fetchBranch()
      }

      getDashboardStat()
        .then(res => {
          totalBranches.value = res.data.total_branch
          totalExtensions.value = res.data.total_extension
          totalRecordings.value = res.data.total_recording
          totalLoggedInUsers.value = res.data.total_logged_in_user
        })
    })

    const hasPermission = (module) => {
      return store.getters['auth/hasPermission'](module, 'GET')
    }

    return {
      branchLoading,
      branchParams,
      branchFields,
      branches,
      totalBranches,
      onBranchClick,

      extensionLoading,
      totalExtensions,

      recordingLoading,
      totalRecordings,

      loggedInUserLoading,
      totalLoggedInUsers,

      hasPermission
    }
  }
})
