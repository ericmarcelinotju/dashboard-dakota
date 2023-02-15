<template>
  <div class="custom-multiselect">
    <multiselect
      v-model="value"
      :multiple="true"
      :options="[]"
      :placeholder="placeholder"
      :taggable="true"
      @tag="addTag"
    />
    <span class="default-input-message">{{ errMsg || error }}</span>
  </div>
</template>

<script>
import { defineComponent, ref, computed, nextTick } from 'vue'
import Multiselect from 'vue-multiselect'
import i18n from '@/i18n'

const { t } = i18n.global

export default defineComponent({
  name: 'InputMultitext',
  components: {
    Multiselect
  },
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    errMsg: {
      type: String,
      default: ''
    },
    validation: {
      type: Function,
      default: () => ''
    },
    duplicateErrMsg: {
      type: String,
      default: t('app.components.customMultitext.duplicateErr')
    },
    placeholder: {
      type: String,
      default: () => 'Input value'
    }
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const value = computed({
      get () {
        return props.modelValue
      },
      set (value) {
        context.emit('update:modelValue', value)
      }
    })
    const error = ref('')
    const addTag = async (newTag) => {
      error.value = ''

      if (!value.value) {
        value.value = []
        await nextTick()
      }

      const isDuplicate = !!value.value.find(item => item === newTag)
      if (isDuplicate) {
        error.value = props.duplicateErrMsg
        return
      }

      const validateMsg = props.validation(newTag)
      if (validateMsg) {
        error.value = validateMsg
        return
      }
      const tempVal = value.value
      tempVal.push(newTag)
      value.value = tempVal
    }

    return {
      value,
      error,
      addTag
    }
  }
})
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
