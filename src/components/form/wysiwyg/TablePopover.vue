<template>
  <div
    v-for="i in 5"
    :key="i"
    class="flex mb-1"
  >
    <button
      v-for="j in 5"
      :key="j"
      class="control-button mr-1"
      :class="{ 'is-active': isInsertTableCellActive(i, j) }"
      :title="title"
      @click="action(i, j)"
      @mouseenter="onInsertTableCellHover(i, j)"
    />
  </div>
</template>

<script>
export default {
  name: 'TablePopover',
  props: {
    title: {
      type: String,
      default: ''
    },
    action: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      hoveredInsertTableCell: [0, 0]
    }
  },
  methods: {
    onInsertTableCellHover (i, j) {
      this.hoveredInsertTableCell = [i, j]
    },
    isInsertTableCellActive (i, j) {
      if (i > this.hoveredInsertTableCell[0] || j > this.hoveredInsertTableCell[1]) {
        return false
      }
      return true
    }
  }
}
</script>
