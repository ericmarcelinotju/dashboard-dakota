<template>
  <div class="flex mb-1">
    <div class="w-8 h-8 mr-1" />
    <button
      class="control-button mr-1 flex items-center justify-center"
      :title="`${title}-top`"
      @click="onBorderTop"
    >
      <img
        class="h-6 w-6"
        src="@/assets/img/svgassets/border-top.svg"
      >
    </button>
    <div class="w-8 h-8 mr-1" />
  </div>
  <div class="flex mb-1">
    <button
      class="control-button mr-1 flex items-center justify-center"
      :title="`${title}-left`"
      @click="onBorderLeft"
    >
      <img
        class="h-6 w-6"
        src="@/assets/img/svgassets/border-left.svg"
      >
    </button>
    <div class="w-8 h-8 mr-1 flex items-center justify-center">
      <div class="bg-black w-2 h-2 rounded-full" />
    </div>
    <button
      class="control-button mr-1 flex items-center justify-center"
      :title="`${title}-right`"
      @click="onBorderRight"
    >
      <img
        class="h-6 w-6"
        src="@/assets/img/svgassets/border-right.svg"
      >
    </button>
  </div>
  <div class="flex mb-1">
    <div class="w-8 h-8 mr-1" />
    <button
      class="control-button mr-1 flex items-center justify-center"
      :title="`${title}-bottom`"
      @click="onBorderBottom"
    >
      <img
        class="h-6 w-6"
        src="@/assets/img/svgassets/border-bottom.svg"
      >
    </button>
    <div class="w-8 h-8 mr-1" />
  </div>
</template>

<script>
export default {
  name: 'BorderPopover',
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
      borderTop: false,
      borderBottom: false,
      borderLeft: false,
      borderRight: false
    }
  },
  computed: {
    borderClass () {
      const borderClass = []
      if (this.borderTop) {
        borderClass.push('top')
      }
      if (this.borderBottom) {
        borderClass.push('bottom')
      }
      if (this.borderLeft) {
        borderClass.push('left')
      }
      if (this.borderRight) {
        borderClass.push('right')
      }
      return borderClass.join(' ')
    }
  },
  methods: {
    onBorderTop () {
      this.borderTop = !this.borderTop
      this.action(this.borderClass)
    },
    onBorderBottom () {
      this.borderBottom = !this.borderBottom
      this.action(this.borderClass)
    },
    onBorderLeft () {
      this.borderLeft = !this.borderLeft
      this.action(this.borderClass)
    },
    onBorderRight () {
      this.borderRight = !this.borderRight
      this.action(this.borderClass)
    }
  }
}
</script>
