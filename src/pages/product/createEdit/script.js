import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDefaultForm } from '@/composables/default-form'
import { pages } from '@/config'
import components from '@/components'
import {
  detail as getProduct,
  insert as insertProduct,
  update as updateProduct
} from '@/api/product'
import { convertJsonToFormData } from '@/utils/body'
import ProductForm from './product/index.vue'
import TheaterForm from './theater/index.vue'

export default defineComponent({
  components: {
    DefaultCreateEdit: components.DefaultCreateEdit,
    DefaultTabs: components.DefaultTabs,
    ProductForm,
    TheaterForm
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { showSuccessNotification, showDangerNotification } = useDefaultForm('product')

    const initialState = {
      code: null,
      name: null,
      description: null,
      purchasePrice: null,
      priceList: null,
      uom: null
    }
    const params = reactive({ ...initialState })
    const formLoading = ref(false)
    const saveLoading = ref(false)

    const routeParams = computed(() => route.params || {})
    const isUpdate = computed(() => !!routeParams.value.id)

    const initPage = () => {
      if (!isUpdate.value) return
      formLoading.value = true
      getProduct(routeParams.value.id)
        .then(res => {
          const product = {
            ...res.data,
            listPrice: res.data.listPriceNumber,
            purchasePrice: res.data.purchasePriceNumber,
            categoryId: res.data.category.id
          }
          Object.assign(initialState, product)
          Object.assign(params, product)
        })
        .catch(err => {
          showDangerNotification('loaded', err?.response?.data)
        })
        .finally(() => {
          formLoading.value = false
        })
    }

    const reset = () => {
      Object.assign(params, initialState)
    }

    const submit = () => {
      saveLoading.value = true

      const payload = convertJsonToFormData(params)
      if (isUpdate.value) {
        updateProduct(routeParams.value.id, payload)
          .then(() => {
            saveSuccess('updated')
          })
          .catch(saveFail)
      } else {
        insertProduct(payload)
          .then(() => {
            saveSuccess('inserted')
          })
          .catch(saveFail)
      }
    }

    const saveSuccess = (message) => {
      reset()
      router.push({ path: `${pages.product.url}` })
      saveLoading.value = false
      showSuccessNotification(message)
    }

    const saveFail = () => {
      showDangerNotification('saved', err?.response?.data)
      saveLoading.value = false
    }

    onMounted(() => {
      initPage()
    })

    const tabOptions = computed(() => isUpdate.value
      ? [
          { label: 'Detail Produk', value: 'product' },
          { label: 'Teater', value: 'theater' }
        ]
      : [
          { label: 'Detail Produk', value: 'product' }
        ]
    )

    return {
      routeParams,
      isUpdate,
      params,
      formLoading,
      saveLoading,
      submit,
      reset,
      tabOptions
    }
  }
})
