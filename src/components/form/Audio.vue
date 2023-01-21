<template>
  <div>
    <input
      id="upload_audio"
      accept="audio/*"
      aria-describedby="upload_audio"
      class="
        block
        w-full
        text-sm
        bg-white
        border border-gray-300
        cursor-pointer
        focus:outline-none
      "
      type="file"
      @input="onAudioChange"
    />
    <audio
      v-if="audioFile"
      id="uploaded_audio"
      class="mt-2"
      controls
      :src="audioSource"
      @durationchange="onDurationChange"
    />
    <div v-else id="upload_audio_info" class="mt-1 text-xs">
      MP3, WAV, or OGG (MAX. 80Mb)
    </div>
  </div>
</template>

<script>

export default {
  name: 'InputAudio',
  props: {
    modelValue: {
      type: File,
      default: null
    }
  },
  emits: ['update:modelValue', 'input'],
  data() {
    return {
      audioFile: null
    }
  },
  computed: {
    audioSource() {
      return URL.createObjectURL(this.audioFile)
    }
  },
  watch: {
    modelValue: {
      handler(val) {
        this.audioFile = val
      },
      immediate: true
    }
  },
  methods: {
    onAudioChange(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      this.audioFile = files[0]
    },
    onDurationChange(e) {
      this.audioFile.duration = e.target.duration
      this.$emit('update:modelValue', this.audioFile)
      this.$emit('input', this.audioFile)
    }
  }
}
</script>

<style lang="scss" scoped>
input[type="file"]::-webkit-file-upload-button,
input[type="file"]::file-selector-button {
  @apply text-white bg-primary-blue hover:bg-secondary-blue font-medium text-sm cursor-pointer border-0 py-1.5 pl-8 pr-4;
  margin-inline-start: -1rem;
  margin-inline-end: 1rem;
}
</style>
