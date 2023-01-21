import { computed, toRef } from 'vue'
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import { ExclamationIcon, XIcon } from '@heroicons/vue/outline'
import components from '@/components'
import i18n from '@/i18n'

const { t } = i18n.global

export default {
  name: 'DefaultModal',
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    ExclamationIcon,
    XIcon,
    Loading: components.Loading
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'warning'
    },
    title: {
      type: String,
      default: t('app.components.defaultModal.title')
    },
    description: {
      type: String,
      default: t('app.components.defaultModal.description')
    },
    confirmText: {
      type: String,
      default: t('app.components.defaultModal.confirm')
    },
    cancelText: {
      type: String,
      default: t('app.components.defaultModal.cancel')
    },
    loading: {
      type: Boolean,
      default: false
    },
    hasCancel: {
      type: Boolean,
      default: true
    },
    hasConfirm: {
      type: Boolean,
      default: true
    },
    hasIcon: {
      type: Boolean,
      default: true
    },
    isCloseOnConfirm: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'confirm', 'close'],
  setup (props, context) {
    const value = toRef(props, 'modelValue')

    const modalColor = computed(() => {
      switch (props.type) {
        case 'warning':
          return 'amber'
        case 'danger':
          return 'rose'
        case 'success':
          return 'green'
        case 'info':
          return 'sky'
      }
      return 'sky'
    })

    const close = () => {
      context.emit('update:modelValue', false)
      context.emit('close')
    }

    const confirm = () => {
      if (props.isCloseOnConfirm) {
        close()
      }
      context.emit('confirm')
    }

    return {
      value,
      modalColor,
      confirm,
      close
    }
  }
}
