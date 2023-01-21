<template>
  <div class="flex w-64 mb-2 mr-2">
    <div
      class="relative flex items-center rounded-md shadow-sm w-full ml-1 mr-3"
    >
      <input
        id="image-link"
        v-model="imageLink"
        class="pr-14 default-input"
        name="image-link"
        type="text"
      >
      <button
        class="default-input-info-right is-button"
        title="image-link"
        @click="onLinkClick"
      >
        <svg class="w-6 h-6">
          <use :xlink:href="`${remixiconUrl}#ri-link`" />
        </svg>
      </button>
    </div>
    <button
      class="control-button mt-1"
      title="image-upload"
      @click.stop="onUploadClick"
    >
      <svg class="w-6 h-6">
        <use :xlink:href="`${remixiconUrl}#ri-image-add-fill`" />
      </svg>
    </button>
    <input
      ref="file"
      accept="image/*"
      class="hidden"
      type="file"
      @change="handleUpload"
    >
  </div>
</template>

<script>
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
import { httpUrl } from '@/utils/validation'
import { uploadFile } from '@/api/media'

export default {
  name: 'ImagePopover',
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
      remixiconUrl,
      loadingLink: false,
      loadingUpload: false,
      imageLink: ''
    }
  },
  methods: {
    onLinkClick () {
      if (httpUrl(this.imageLink)) {
        this.action(this.imageLink)
        return
      }
      this.imageLink = ''
    },
    onUploadClick () {
      this.$refs.file.click()
    },
    handleUpload (event) {
      const imageFile = event.target.files[0]

      const formData = new FormData()
      formData.append('file', imageFile)

      uploadFile(
        (resp) => {
          const filename = resp.data.data
          if (filename) {
            this.action(filename)
          }
        },
        () => { },
        formData)
    }
  }
}
</script>

<style lang="scss" scoped>
.control-button {
  height: auto;
  width: auto;
}
</style>
