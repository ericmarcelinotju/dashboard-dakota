<template>
  <Popover class="relative">
    <PopoverButton
      class="group inline-flex items-center text-primary-blue outline-none"
      :class="className"
    >
      <span><InformationCircleIcon class="w-4 h-4" /></span>
    </PopoverButton>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel
        class="absolute left-0 top-6 min-w-36 w-96 z-10 px-4 lg:max-w-3xl"
      >
        <div class="overflow-hidden rounded-sm shadow-lg">
          <div
            class="bg-gray-500 p-3 block text-xs text-white font-medium"
            v-html="info"
          />
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { InformationCircleIcon } from '@heroicons/vue/solid'

export default {
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
    InformationCircleIcon
  },
  props: {
    info: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  }
}
</script>
