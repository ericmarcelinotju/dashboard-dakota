<template>
  <div class="flex">
    <img
      v-if="avatarFile"
      id="avatar_image"
      class="w-24 h-24 rounded-full"
      controls
      :src="avatarSource"
    >
    <img
      v-else-if="defaultAvatar"
      :id="id"
      class="w-24 h-24 rounded-full"
      :src="defaultAvatar"
    >
    <div
      v-else
      id="avatar_image"
      class="w-24 p-4 border-2 rounded-full"
    >
      <UserIcon />
    </div>
    <div class="ml-6 flex flex-col justify-center">
      <input
        id="upload_avatar"
        accept="image/*"
        aria-describedby="upload_avatar"
        class="hidden"
        type="file"
        @input="onAvatarChange"
      >
      <label
        class="link text-sm"
        for="upload_avatar"
      >
        Unggah Foto
      </label>
      <a
        class="link text-sm mt-2"
        @click="onDeleteClick"
      >
        Hapus Foto
      </a>
    </div>
  </div>
</template>

<script>
import { UserIcon } from '@heroicons/vue/solid'

export default {
  name: 'InputAvatar',
  components: {
    UserIcon
  },
  props: {
    modelValue: {
      type: File,
      default: null
    }
  },
  emits: ['update:modelValue', 'input'],
  data () {
    return {
      avatarFile: null,
      defaultAvatar: null
    }
  },
  computed: {
    avatarSource () {
      return URL.createObjectURL(this.avatarFile)
    }
  },
  watch: {
    modelValue: {
      handler (val) {
        this.defaultAvatar = val
      },
      immediate: true
    }
  },
  methods: {
    onAvatarChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      this.avatarFile = files[0]

      this.$emit('update:modelValue', this.avatarFile)
      this.$emit('input', this.avatarFile)
    },
    onDeleteClick () {
      this.avatarFile = null

      this.$emit('update:modelValue', this.avatarFile)
      this.$emit('input', this.avatarFile)
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
