<template>
  <div class="flex">
    <video
      v-if="videoFile"
      :id="id"
      class="w-96 h-64"
      controls
      :src="videoSource"
    />
    <video
      v-else-if="defaultVideo"
      :id="id"
      class="w-96 h-64"
      controls
      :src="defaultVideo"
    />
    <div
      v-else
      :id="id"
      class="w-96 h-64 border-2"
    >
      <VideoCameraIcon class="m-auto w-64" />
    </div>
    <div class="ml-6 flex flex-col justify-center">
      <input
        :id="`upload_${id}`"
        accept="video/*"
        aria-describedby="upload_video"
        class="hidden"
        type="file"
        @input="onVideoChange"
      >
      <label
        class="link text-sm"
        :for="`upload_${id}`"
      >
        {{ label }}
      </label>
      <a
        class="link text-sm mt-2"
        @click="onDeleteClick"
      >
        {{ resetLabel }}
      </a>
    </div>
  </div>
</template>

<script>
import { VideoCameraIcon } from '@heroicons/vue/solid'

export default {
  name: 'InputVideo',
  components: {
    VideoCameraIcon
  },
  props: {
    id: {
      type: String,
      default: 'video'
    },
    label: {
      type: String,
      default: 'Unggah Video'
    },
    resetLabel: {
      type: String,
      default: 'Hapus Video'
    },
    modelValue: {
      type: File,
      default: null
    }
  },
  emits: ['update:modelValue', 'input'],
  data () {
    return {
      videoFile: null,
      defaultVideo: null
    }
  },
  computed: {
    videoSource () {
      return URL.createObjectURL(this.videoFile)
    }
  },
  watch: {
    modelValue: {
      handler (val) {
        this.defaultVideo = val
      },
      immediate: true
    }
  },
  methods: {
    onVideoChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      this.videoFile = files[0]

      this.$emit('update:modelValue', this.videoFile)
      this.$emit('input', this.videoFile)
    },
    onDeleteClick () {
      this.videoFile = null

      this.$emit('update:modelValue', this.videoFile)
      this.$emit('input', this.videoFile)
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
