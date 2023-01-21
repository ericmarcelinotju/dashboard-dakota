<template>
  <div class="text-center">
    <b>{{ label }}</b>
    <div
      class="
        w-[420px]
        h-[420px]
        border border-gray-300
        overflow-y-auto
        text-left
        select-none
      "
    >
      <div
        v-for="(option, idx) in options"
        :key="option[valueKey]"
        class="
          p-2
          cursor-pointer
          hover:bg-sky-100
          border border-white border-dashed
        "
        :class="{ 'bg-gray-300': getOptionIndex(option) >= 0 }"
        @click.ctrl="onControlClick(option)"
        @click.exact="onClick(option)"
        @click.shift="onShiftClick(idx, option)"
      >
        <slot
          :item="option"
          name="label"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SelectionList',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup (props, context) {
    const selectedOptions = computed({
      get () {
        return props.modelValue
      },
      set (value) {
        context.emit('update:modelValue', value)
      }
    })

    const onClick = (option) => {
      // Replace selection with the clicked item
      const optionIndex = getOptionIndex(option)
      if (optionIndex >= 0) {
        selectedOptions.value.splice(optionIndex, 1)
      } else {
        selectedOptions.value.length = 0
        selectedOptions.value.push(option)
      }
    }

    const onControlClick = (option) => {
      // Add the clicked item to selection
      const optionIndex = getOptionIndex(option)
      if (optionIndex >= 0) {
        selectedOptions.value.splice(optionIndex, 1)
      } else {
        selectedOptions.value.push(option)
      }
    }

    const onShiftClick = (idx, option) => {
      // Add all option between selection and the clicked option to the selection
      let firstIdx = Infinity
      for (const option of selectedOptions.value) {
        const selectionIdx = props.options.findIndex(item => item[props.valueKey] === option[props.valueKey])
        if (selectionIdx >= 0 && selectionIdx < firstIdx) {
          firstIdx = selectionIdx
        }
      }

      selectedOptions.value.length = 0
      selectedOptions.value.push(...props.options.slice(firstIdx, idx + 1))
    }

    const getOptionIndex = (option) => {
      return selectedOptions.value.findIndex(selectedOption => selectedOption[props.valueKey] === option[props.valueKey])
    }

    return {
      onClick,
      onControlClick,
      onShiftClick,
      getOptionIndex
    }
  }
})
</script>
