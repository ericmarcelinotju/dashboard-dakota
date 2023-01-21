<template>
  <Switch
    v-model="value"
    class="relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    :class="value ? 'bg-primary-blue' : 'bg-gray-400'"
  >
    <span class="sr-only">Use setting</span>
    <span
      aria-hidden="true"
      class="pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
      :class="value ? 'translate-x-5' : 'translate-x-0'"
    />
  </Switch>
</template>

<script>
import { Switch } from '@headlessui/vue'

export default {
  name: 'InputSwitch',
  components: {
    Switch
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'input'],
  computed: {
    value: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
        this.$emit('input', value)
      }
    }
  }
}
</script>
