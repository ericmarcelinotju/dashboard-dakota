<template>
  <div class="flex">
    <template
      v-for="(item, index) in menus"
      :key="index"
    >
      <div
        v-if="item.type === 'divider'"
        :key="`divider${index}`"
        class="divider"
      />
      <Popover
        v-else-if="item.type === 'popover'"
        class="relative"
      >
        <PopoverButton>
          <button
            class="control-button mr-2"
            :class="{ 'is-active': item.isActive ? item.isActive() : null }"
            :title="item.title"
          >
            <svg class="w-full h-full">
              <use :xlink:href="`${remixiconUrl}#ri-${item.icon}`" />
            </svg>
          </button>
        </PopoverButton>

        <PopoverPanel
          class="
            absolute
            z-10
            pt-2
            pl-2
            pb-1
            pr-1
            shadow-sm
            rounded-md
            bg-white
            border
          "
        >
          <component
            :is="item.popoverContent"
            :action="item.action"
            :title="item.title"
          />
        </PopoverPanel>
      </Popover>
      <button
        v-else
        class="control-button mr-2"
        :class="{ 'is-active': item.isActive ? item.isActive() : null }"
        :title="item.title"
        @click="item.action"
      >
        <svg class="w-full h-full">
          <use :xlink:href="`${remixiconUrl}#ri-${item.icon}`" />
        </svg>
      </button>
    </template>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'

import ImagePopover from './ImagePopover.vue'
import TablePopover from './TablePopover.vue'

const imagePopover = shallowRef(ImagePopover)
const tablePopover = shallowRef(TablePopover)

export default {
  components: { Popover, PopoverButton, PopoverPanel },
  props: {
    editor: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      remixiconUrl,
      hoveredInsertTableCell: [0, 0],
      menus: [
        {
          icon: 'bold',
          title: 'Bold',
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive('bold')
        },
        {
          icon: 'italic',
          title: 'Italic',
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive('italic')
        },
        {
          icon: 'strikethrough',
          title: 'Strike',
          action: () => this.editor.chain().focus().toggleStrike().run(),
          isActive: () => this.editor.isActive('strike')
        },
        {
          icon: 'mark-pen-line',
          title: 'Highlight',
          action: () => this.editor.chain().focus().toggleHighlight().run(),
          isActive: () => this.editor.isActive('highlight')
        },
        { type: 'divider' },
        {
          type: 'popover',
          icon: 'image-fill',
          title: 'Image',
          popoverContent: imagePopover,
          action: (url) => this.editor.chain().focus().setImage({ src: url }).run(),
          isActive: () => false
        },
        { type: 'divider' },
        {
          type: 'popover',
          icon: 'table-line',
          title: 'Table',
          popoverContent: tablePopover,
          action: (rows, cols) => this.editor.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run(),
          isActive: () => false
        },
        {
          icon: 'merge-cells-horizontal',
          title: 'Merge',
          action: () => this.editor.chain().focus().mergeOrSplit().run(),
          isActive: () => this.editor.can().splitCell()
        },
        { type: 'divider' },
        {
          icon: 'align-left',
          title: 'Left',
          action: () => this.editor.chain().focus().setTextAlign('left').run(),
          isActive: () => this.editor.isActive({ textAlign: 'left' })
        },
        {
          icon: 'align-center',
          title: 'Center',
          action: () => this.editor.chain().focus().setTextAlign('center').run(),
          isActive: () => this.editor.isActive({ textAlign: 'center' })
        },
        {
          icon: 'align-right',
          title: 'Right',
          action: () => this.editor.chain().focus().setTextAlign('right').run(),
          isActive: () => this.editor.isActive({ textAlign: 'right' })
        },
        {
          icon: 'align-justify',
          title: 'Justify',
          action: () => this.editor.chain().focus().setTextAlign('justify').run(),
          isActive: () => this.editor.isActive({ textAlign: 'justify' })
        },
        { type: 'divider' },
        {
          icon: 'h-1',
          title: 'Heading 1',
          action: () => this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => this.editor.isActive('heading', { level: 1 })
        },
        {
          icon: 'h-2',
          title: 'Heading 2',
          action: () => this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => this.editor.isActive('heading', { level: 2 })
        },
        {
          icon: 'paragraph',
          title: 'Paragraph',
          action: () => this.editor.chain().focus().setParagraph().run(),
          isActive: () => this.editor.isActive('paragraph')
        },
        {
          icon: 'list-unordered',
          title: 'Bullet List',
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive('bulletList')
        },
        {
          icon: 'list-ordered',
          title: 'Ordered List',
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
          isActive: () => this.editor.isActive('orderedList')
        },
        { type: 'divider' },
        {
          icon: 'double-quotes-l',
          title: 'Blockquote',
          action: () => this.editor.chain().focus().toggleBlockquote().run(),
          isActive: () => this.editor.isActive('blockquote')
        },
        {
          icon: 'separator',
          title: 'Horizontal Rule',
          action: () => this.editor.chain().focus().setHorizontalRule().run()
        },
        { type: 'divider' },
        {
          icon: 'text-wrap',
          title: 'Hard Break',
          action: () => this.editor.chain().focus().setHardBreak().run()
        },
        {
          icon: 'format-clear',
          title: 'Clear Format',
          action: () => this.editor.chain()
            .focus()
            .clearNodes()
            .unsetAllMarks()
            .run()
        },
        { type: 'divider' },
        {
          icon: 'arrow-go-back-line',
          title: 'Undo',
          action: () => this.editor.chain().focus().undo().run()
        },
        {
          icon: 'arrow-go-forward-line',
          title: 'Redo',
          action: () => this.editor.chain().focus().redo().run()
        }
      ]
    }
  }
}
</script>
