<template>
  <TabGroup>
    <TabList class="flex border-l-2">
      <Tab v-for="option in options" :key="option.value" v-slot="{ selected }">
        <button
          class="
            relative
            top-[1px]
            w-full
            py-2
            px-4
            hover:bg-gray-100
            border-t-2 border-r-2 border-b-4
          "
          :class="selected ? 'border-b-primary-red' : 'border-b-transparent'"
        >
          {{ option.label }}
        </button>
      </Tab>
    </TabList>
    <TabPanels class="border-t border-gray-300">
      <TabPanel
        v-for="option in options"
        :key="option.value"
        class="p-3 outline-0"
      >
        <slot :name="option.value" />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
export default {
  name: 'DefaultTabs',
  components: {
    TabGroup, TabList, Tab, TabPanels, TabPanel
  },
  props: {
    options: {
      type: Array,
      default: () => []
    }
  }
}
</script>
