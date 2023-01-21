<template>
  <div>
    <Listbox
      v-if="type === 'list'"
      v-model="value"
      :disabled="disabled"
    >
      <ListboxLabel>
        <slot name="label" />
      </ListboxLabel>
      <div class="relative">
        <ListboxButton
          :class="
            className
              ? className
              : 'px-2 text-left border border-gray-300 default-input'
          "
        >
          <span
            v-if="selectedOption"
            class="block truncate"
          >
            {{ selectedOption[labelKey] }}
          </span>
          <span
            v-else
            class="block truncate text-gray-400"
          > Select </span>
          <span
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-2
              pointer-events-none
            "
          >
            <SelectorIcon
              aria-hidden="true"
              class="w-5 h-5 text-gray-500"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="
              absolute
              w-full
              py-1
              mt-1
              z-10
              overflow-auto
              text-base
              bg-white
              rounded-md
              shadow-lg
              max-h-60
              ring-1 ring-black ring-opacity-5
              focus:outline-none
              text-sm
            "
          >
            <ListboxOption
              v-for="option in options"
              :key="option[valueKey]"
              v-slot="{ active, selected }"
              as="template"
              :value="option[valueKey]"
            >
              <li
                :class="[
                  active ? 'bg-gray-100' : 'text-gray-900',
                  'cursor-default select-none relative py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  {{ option[labelKey] }}
                </span>
                <span
                  v-if="selected"
                  class="
                    absolute
                    inset-y-0
                    left-0
                    flex
                    items-center
                    pl-3
                    text-green-600
                  "
                >
                  <CheckIcon
                    aria-hidden="true"
                    class="w-5 h-5 text-green-600"
                  />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>

    <Combobox
      v-if="type === 'combo'"
      v-model="value"
      :disabled="disabled"
    >
      <ComboboxLabel>
        <slot name="label" />
      </ComboboxLabel>
      <div class="relative">
        <div>
          <ComboboxInput
            autocomplete="off"
            :class="
              className
                ? className
                : 'p-2 text-left border border-gray-300 default-input'
            "
            :display-value="
              () => (selectedOption ? selectedOption[labelKey] : '')
            "
            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-2
              pointer-events-none
            "
          >
            <SelectorIcon
              aria-hidden="true"
              class="w-5 h-5 text-gray-500"
            />
          </ComboboxButton>
        </div>

        <TransitionRoot
          leave="transition ease-in duration-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="
              absolute
              w-full
              py-1
              mt-1
              z-10
              overflow-auto
              text-base
              bg-white
              rounded-md
              shadow-lg
              max-h-60
              ring-1 ring-black ring-opacity-5
              focus:outline-none
              text-sm
              cursor-pointer
            "
          >
            <ComboboxOption
              v-for="option in filteredOptions"
              :key="option[valueKey]"
              v-slot="{ active, selected }"
              as="template"
              :value="option[valueKey]"
            >
              <li
                :class="[
                  active ? 'text-green-900 bg-green-100' : 'text-gray-900',
                  'cursor-default select-none relative py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  {{ option[labelKey] }}
                </span>
                <span
                  v-if="selected"
                  class="
                    absolute
                    inset-y-0
                    left-0
                    flex
                    items-center
                    pl-3
                    text-green-600
                  "
                >
                  <CheckIcon
                    aria-hidden="true"
                    class="w-5 h-5 text-green-600"
                  />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>

<script src="./script.js"></script>
