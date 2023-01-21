<template>
  <div class="custom-multiselect">
    <multiselect
      v-bind="$attrs"
      :multiple="true"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Multiselect from 'vue-multiselect'

export default defineComponent({
  name: 'InputMultiselect',
  components: {
    Multiselect
  }
})
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
