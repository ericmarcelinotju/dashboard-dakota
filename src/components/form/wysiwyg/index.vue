<template>
  <div class="editor">
    <Menus
      v-if="editor"
      class="editor__header"
      :editor="editor"
    />
    <editor-content
      class="editor__content"
      :editor="editor"
    />
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'

import Menus from './Menus.vue'

export default {
  name: 'InputWysiwyg',
  components: {
    EditorContent,
    Menus
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      editor: null
    }
  },
  watch: {
    modelValue (value) {
      const isSame = this.editor.getHTML() === value
      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    }
  },
  mounted () {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Table.configure({
          resizable: true
        }),
        TableRow,
        TableHeader,
        TableCell,
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        Image
      ],
      content: this.modelValue,
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor.getHTML())
      }
    })
  },
  beforeUnmount () {
    this.editor.destroy()
  }
}
</script>

<style lang="scss">
.editor {
  @apply flex flex-col bg-white border border-gray-300 rounded-md shadow-sm;

  &__header {
    @apply p-2 flex items-center flex-none flex-wrap border-b-2 border-gray-300;
  }

  &__content {
    @apply py-4 px-6 flex-auto;
  }
}
.ProseMirror {
  img {
    width: 120px;
  }
  &:focus {
    outline: none;
  }

  ul,
  ol {
    list-style-position: inside;
    li {
      p {
        display: inline-block;
      }
    }
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  h1 {
    line-height: 1.3;
    font-size: 2.5rem;
  }

  h2 {
    line-height: 1.3;
    font-size: 2rem;
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    &.content {
      td,
      th {
        border: 2px solid #ced4da;
      }
    }

    td,
    th {
      min-width: 1em;
      border: 2px dashed #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }
}
</style>
