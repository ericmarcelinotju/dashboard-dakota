export default {
  name: 'EmptyBar',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '30px'
    },
    display: {
      type: String,
      default: 'inline-block'
    },
    margin: {
      type: String,
      default: '0'
    },
    shape: {
      type: String,
      default: 'box'
    }
  },
  computed: {
    borderRadius () {
      const defaultBorderRadius = '16px'
      if (this.shape === 'circle') return '50px'
      return defaultBorderRadius
    },
    style () {
      const result = {
        width: this.width,
        height: this.height,
        display: this.display,
        borderRadius: this.borderRadius
      }
      if (this.margin !== '0') {
        result.margin = this.margin
      }
      return result
    }
  }
}
