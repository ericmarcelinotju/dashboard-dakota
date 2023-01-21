import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { pages } from '@/config'
import { UserIcon, LockClosedIcon } from '@heroicons/vue/solid'
import components from '@/components'
import { forgotPassword } from '@/api/auth'
import { required, email } from '@/utils/validation'

export default defineComponent({
  components: {
    UserIcon,
    LockClosedIcon,
    DefaultModal: components.DefaultModal
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    const user = {
      username: '',
      password: '',
      remember_me: false
    }

    const params = reactive({ ...user })
    const error = ref(null)

    const handleLogin = () => {
      store.dispatch('auth/login', { ...params })
        .then(() => {
          router.push({ path: pages.dashboard.url })
        })
        .catch(err => {
          error.value = err.response && err.response.data
        })
    }

    const defaultForgotPasswordParams = {
      username: null,
      email: null
    }
    const forgotPasswordParams = reactive({ ...defaultForgotPasswordParams })
    const forgotPasswordLoading = ref(false)
    const forgotPasswordMessage = ref('')
    const visibleForgotPasswordModal = ref(false)
    const handleForgotPassword = () => {
      visibleForgotPasswordModal.value = true
    }
    const onConfirmForgotPassword = () => {
      forgotPasswordLoading.value = true

      // Validate form
      const usernameReq = !required(forgotPasswordParams.username)
      const emailReq = !required(forgotPasswordParams.email)

      if (usernameReq && emailReq) {
        forgotPasswordMessage.value = 'Both username and email field are required.'
      }
      const emailEmail = !email(forgotPasswordParams.email)
      if (!emailReq && emailEmail) {
        forgotPasswordMessage.value = 'Email format invalid.'
      }
      if (usernameReq || emailReq || emailEmail) {
        forgotPasswordLoading.value = false
        return
      }

      forgotPassword(forgotPasswordParams)
        .then(() => {
          forgotPasswordMessage.value = 'Reset password email has been sent! Please check your e-mail.'

          setTimeout(() => {
            visibleForgotPasswordModal.value = false
          }, 5000)
        })
        .catch(err => {
          if (err.response.code === 404) {
            forgotPasswordMessage.value = 'Incorrect username or email. Contact your administrator.'
          } else {
            forgotPasswordMessage.value = 'Unexpected error, please contact your administrator.'
          }
        })
        .finally(() => {
          forgotPasswordLoading.value = false
        })
    }

    const onCloseForgotPassword = () => {
      forgotPasswordLoading.value = false
      forgotPasswordMessage.value = ''
      Object.assign(forgotPasswordParams, defaultForgotPasswordParams)
    }

    return {
      handleLogin,
      params,
      error,

      forgotPasswordParams,
      forgotPasswordLoading,
      forgotPasswordMessage,
      visibleForgotPasswordModal,
      handleForgotPassword,
      onConfirmForgotPassword,
      onCloseForgotPassword
    }
  }
})
