import { computed, defineComponent, ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Datepicker from '@vuepic/vue-datepicker'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  insert as insertProduct,
  update as updateProduct
} from '@/api/product'
import { get as getProductCategory } from '@/api/productCategory'
import { convertJsonToFormData } from '@/utils/body'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    DefaultTabs: components.DefaultTabs,
    Loading: components.Loading,
    InputDropdown: components.InputDropdown,
    InputImage: components.InputImage,
    Datepicker
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('product')

    const params = reactive(props.product)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const hasId = computed(() => !!routeParams.value.id)

    const categories = ref([])

    const submit = () => {
      saveLoading.value = true

      const payload = convertJsonToFormData(params)
      if (hasId.value) {
        updateProduct(routeParams.value.id, payload)
          .then(() => {
            router.push({ path: `${pages.product.url}` })
            showSuccessNotification('updated')
          })
          .catch(() => {
            showDangerNotification('saved')
          })
          .finally(() => {
            saveLoading.value = false
          })
      } else {
        insertProduct(payload)
          .then(() => {
            router.push({ path: `${pages.product.url}` })
            showSuccessNotification('inserted')
          })
          .catch(() => {
            showDangerNotification('saved')
          })
          .finally(() => {
            saveLoading.value = false
          })
      }
    }

    const hasPermission = (method, module = 'USER') => {
      return store.getters['auth/hasPermission'](module, method)
    }

    onMounted(() => {
      getProductCategory()
        .then(res => {
          categories.value = res.data.data
        })
    })

    return {
      routeParams,
      hasId,
      params,
      saveLoading,
      submit,
      categories,
      hasPermission
    }
  }
})
