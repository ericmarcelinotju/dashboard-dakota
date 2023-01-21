import { computed } from 'vue'

const withProps = () => ({
  data: {
    type: Object,
    default: () => ({})
  }
})

const newTabTarget = (item) => {
  return item.newTab ? '_blank' : ''
}

const useFlatParameters = (data = {}) => {
  const flatParameters = computed(() => {
    if (!data) return []
    return data.assets || []
  })

  return {
    flatParameters
  }
}

export {
  withProps,
  newTabTarget,
  useFlatParameters
}
