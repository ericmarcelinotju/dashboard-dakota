import { defineComponent, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pages } from '@/config'
import { UserIcon, LockClosedIcon } from '@heroicons/vue/solid'
import components from '@/components'
import { resetPassword } from '@/api/auth'

export default defineComponent({
  components: {
    UserIcon,
    LockClosedIcon,
    DefaultModal: components.DefaultModal
  },
  setup () {
    const route = useRoute()
    const router = useRouter()

    const defaultParams = {
      new_password: null,
      confirm_password: null
    }

    const params = reactive({ ...defaultParams })
    const errorMessage = ref('')

    const handleResetPassword = () => {
      if (params.new_password !== params.confirm_password) {
        errorMessage.value = 'Confirm password did not match!'
        return
      }

      resetPassword({
        ...params,
        forgot_token: route.query.fpkey
      })
        .then(() => {
          handleLogin()
        })
        .catch(err => {
          errorMessage.value = err
        })
    }

    const handleLogin = () => {
      router.replace({ path: pages.auth.login.url })
    }

    return {
      params,
      errorMessage,
      handleLogin,
      handleResetPassword
    }
  }
})
