import { CloudUploadIcon, TrashIcon } from '@heroicons/vue/outline'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'InputImage',
  components: {
    CloudUploadIcon,
    TrashIcon
  },
  props: {
    isMultiple: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'images'
    },
    id: {
      type: String,
      default: 'images'
    },
    modelValue: {
      type: File,
      default: null
    }
  },
  emits: ['change', 'update:modelValue'],
  setup (props, { emit }) {
    const images = reactive([])

    const onFileChange = (e) => {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      if (props.isMultiple) {
        emit('update:modelValue', files[0])
      }
    }

    const removeImage = (index) => {
      images.splice(index, 1)
      emit('change', images)
    }

    return {
      images,
      onFileChange,
      removeImage
    }
  }
})
