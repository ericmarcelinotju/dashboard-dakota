<template>
  <div id="app-container">
    <router-view v-slot="{ Component }">
      <transition
        mode="out-in"
        name="fade"
      >
        <component :is="Component" />
      </transition>
    </router-view>
    <Notification />
  </div>
</template>

<script>
import { defineAsyncComponent, defineComponent } from 'vue'

const Notification = defineAsyncComponent(() => import(
  /* webpackChunkName: "c-notification" */ '@/components/Notification.vue'))

export default defineComponent({
  components: {
    Notification
  },
  setup () {
    return {}
  }
})

</script>
