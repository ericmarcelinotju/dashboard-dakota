import { defineComponent } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOptions,
  ListboxOption,
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxLabel,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'InputDropdown',
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOptions,
    ListboxOption,
    Combobox,
    ComboboxInput,
    ComboboxButton,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
    TransitionRoot,
    CheckIcon,
    SelectorIcon
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    className: {
      type: String,
      default: ''
    },
    labelKey: {
      type: String,
      default: 'name'
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    type: {
      type: String,
      default: 'list'
    },
    modelValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'input'],
  data () {
    return {
      query: ''
    }
  },
  computed: {
    value: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
        this.$emit('input', value)
      }
    },
    selectedOption () {
      return this.options.find(option => option[this.valueKey] === this.value)
    },
    filteredOptions () {
      return this.query === ''
        ? this.options
        : this.options.filter(option => {
          return option[this.labelKey]
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(this.query.toLowerCase().replace(/\s+/g, ''))
        })
    }
  }
})
