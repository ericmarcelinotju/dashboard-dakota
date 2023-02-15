<template>
  <div class="flex">
    <img
      v-if="imageFile"
      :id="id"
      class="w-96 h-64"
      :src="imageSource"
    >
    <img
      v-else-if="defaultImage"
      :id="id"
      class="w-96 h-64"
      :src="defaultImage"
    >
    <div
      v-else
      :id="id"
      class="w-96 h-64 border-2"
    >
      <PhotographIcon class="m-auto w-64" />
    </div>
    <div class="ml-6 flex flex-col justify-center">
      <input
        :id="`upload_${id}`"
        accept="image/*"
        aria-describedby="upload_image"
        class="hidden"
        type="file"
        @input="onImageChange"
      >
      <label
        class="link text-sm"
        :for="`upload_${id}`"
      >
        {{ label }}
      </label>
      <a class="link text-sm mt-2">{{ resetLabel }}</a>
    </div>
  </div>
</template>

<script>
import { PhotographIcon } from '@heroicons/vue/solid'

export default {
  name: 'InputImage',
  components: {
    PhotographIcon
  },
  props: {
    id: {
      type: String,
      default: 'video'
    },
    label: {
      type: String,
      default: 'Unggah Gambar'
    },
    resetLabel: {
      type: String,
      default: 'Hapus Gambar'
    },
    modelValue: {
      type: File,
      default: null
    }
  },
  emits: ['update:modelValue', 'input'],
  data () {
    return {
      imageFile: null,
      defaultImage: null
    }
  },
  computed: {
    imageSource () {
      return URL.createObjectURL(this.imageFile)
    }
  },
  watch: {
    modelValue: {
      handler (val) {
        this.defaultImage = val
      },
      immediate: true
    }
  },
  methods: {
    onImageChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      this.imageFile = files[0]

      this.$emit('update:modelValue', this.imageFile)
      this.$emit('input', this.imageFile)
    }
  }
}
</script>

<style lang="scss" scoped>
input[type="file"] {
  @apply text-red-500 underline;
}
input[type="file"]::-webkit-file-upload-button,
input[type="file"]::file-selector-button {
  @apply hidden;
  margin-inline-start: -1rem;
  margin-inline-end: 1rem;
}
</style>
