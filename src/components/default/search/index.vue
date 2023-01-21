<template>
  <div class="flex">
    <div
      v-if="hasSearchableAndFilterableFields"
      class="inset-y-0 left-0 flex items-center"
    >
      <label
        class="sr-only"
        for="search"
      >
        {{ $t("app.components.customSearch.searchTypeLabel") }}
      </label>
      <select
        id="search"
        v-model="selectedField"
        autocomplete="search"
        class="
          focus:ring-primary-blue
          w-32
          focus:border-primary-blue
          h-full
          py-0
          pl-3
          pr-7
          border-transparent
          bg-gray-100
          text-gray-500 text-sm
        "
        name="search"
      >
        <option
          v-for="field in searchableFields"
          :key="field"
          :value="field"
        >
          {{ field.name }}
        </option>
      </select>
    </div>
    <div
      :class="[
        {
          'border-l-2 border-gray-300 bg-gray-100 w-72': hasSearchableFields,
        },
        'relative',
      ]"
    >
      <div
        class="
          absolute
          inset-y-0
          left-0
          pl-3
          flex
          items-center
          pointer-events-none
        "
      >
        <SearchIcon
          aria-hidden="true"
          class="h-5 w-5 text-gray-400"
        />
      </div>
      <InputDropdown
        v-if="selectedField && selectedField.filterable && options.length > 0"
        v-model="params.searchValue"
        class="pl-12"
        class-name="text-left w-full py-2 sm:text-sm border-transparent bg-gray-100 block"
        :options="options"
        type="list"
        @input="search"
      />
      <Datepicker
        v-else-if="
          selectedField &&
            selectedField.filterable &&
            selectedField.option === 'date_range'
        "
        v-model="datePeriod"
        auto-apply
        :clearable="false"
        :enable-time-picker="false"
        input-class-name="search-datepicker"
        range
        @update:model-value="search"
      />
      <Datepicker
        v-else-if="
          selectedField &&
            selectedField.filterable &&
            selectedField.option === 'date'
        "
        v-model="date"
        auto-apply
        :clearable="false"
        :enable-time-picker="false"
        input-class-name="search-datepicker"
        @update:model-value="search"
      />
      <div v-else>
        <input
          id="search"
          v-model="params.searchValue"
          class="
            focus:ring-primary-blue focus:border-primary-blue
            w-full
            pl-12
            sm:text-sm
            border-transparent
            bg-gray-100
            block
          "
          name="search"
          :placeholder="`Search ${params.searchValue}`"
          type="text"
          @keyup.enter="search"
        >
        <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd
            class="
              inline-flex
              items-center
              border border-gray-200
              rounded
              px-2
              text-sm
              font-sans font-medium
              text-gray-400
              hover:bg-primary-blue hover:text-white hover:cursor-pointer
            "
            :disabled="loading"
            @click="search"
          >
            <Loading v-if="loading" />
            {{ $t("app.components.customSearch.confirm") }}
          </kbd>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
