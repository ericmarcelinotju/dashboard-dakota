<template>
  <div class="flex items-center gap-4">
    <List
      v-model="selectedAvailableOptions"
      label="Available"
      :options="availableOptions"
      :value-key="valueKey"
    >
      <template #label="{ item }">
        <slot
          :item="item"
          name="label"
        />
      </template>
    </List>

    <div class="control">
      <button
        class="info-button"
        @click="onChooseAllClick"
      >
        <ChevronDoubleRightIcon class="w-5 h-6" />
      </button>
      <button
        class="info-button"
        @click="onChooseSelectionClick"
      >
        <ChevronRightIcon class="w-5 h-6" />
      </button>
      <button
        class="info-button"
        @click="onRemoveSelectionClick"
      >
        <ChevronLeftIcon class="w-5 h-6" />
      </button>
      <button
        class="info-button"
        @click="onRemoveAllClick"
      >
        <ChevronDoubleLeftIcon class="w-5 h-6" />
      </button>
    </div>

    <List
      v-model="selectedChoosenOptions"
      label="Selected"
      :options="choosenOptions"
      :value-key="valueKey"
    >
      <template #label="{ item }">
        <slot
          :item="item"
          name="label"
        />
      </template>
    </List>
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/vue/solid'
import List from './List.vue'

export default defineComponent({
  name: 'InputDualList',
  components: {
    List,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
  },
  props: {
    options: {
      type: Array,
      default: () => []
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
    watch(() => props.options, (value) => {
      // Must clear array before assign
      availableOptions.splice(0)
      Object.assign(availableOptions, value.filter(option =>
        props.modelValue.findIndex(item => item[props.valueKey] === option[props.valueKey]) === -1))
    })

    const availableOptions = reactive(
      props.options.filter(option =>
        props.modelValue.findIndex(item => item[props.valueKey] === option[props.valueKey]) === -1))
    const selectedAvailableOptions = reactive([])

    const choosenOptions = reactive(props.modelValue)
    const selectedChoosenOptions = reactive([])

    const onChooseAllClick = () => {
      choosenOptions.push(...availableOptions)
      availableOptions.length = 0

      context.emit('update:modelValue', choosenOptions)
    }

    const onChooseSelectionClick = () => {
      choosenOptions.push(...selectedAvailableOptions)
      const filteredOptions = availableOptions.filter(item =>
        selectedAvailableOptions.findIndex(option =>
          item[props.valueKey] === option[props.valueKey]) === -1
      )
      availableOptions.length = 0
      availableOptions.push(...filteredOptions)

      context.emit('update:modelValue', choosenOptions)

      selectedAvailableOptions.splice(0)
    }

    const onRemoveSelectionClick = () => {
      availableOptions.push(...selectedChoosenOptions)
      const filteredOptions = choosenOptions.filter(item =>
        selectedChoosenOptions.findIndex(option =>
          item[props.valueKey] === option[props.valueKey]) === -1
      )
      choosenOptions.length = 0
      choosenOptions.push(...filteredOptions)

      context.emit('update:modelValue', choosenOptions)

      selectedChoosenOptions.splice(0)
    }

    const onRemoveAllClick = () => {
      availableOptions.push(...choosenOptions)
      choosenOptions.length = 0

      context.emit('update:modelValue', choosenOptions)
    }

    return {
      availableOptions,
      selectedAvailableOptions,
      choosenOptions,
      selectedChoosenOptions,
      onChooseAllClick,
      onChooseSelectionClick,
      onRemoveAllClick,
      onRemoveSelectionClick
    }
  }
})
</script>

<style lang="scss" scoped>
.control {
  @apply flex flex-col gap-2;

  .info-button {
    @apply px-2 py-1;
  }
}
</style>
