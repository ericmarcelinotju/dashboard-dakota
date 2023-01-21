<template>
  <form @submit.prevent="onSubmit">
    <div class="default-field">
      <label
        class="default-label"
        for="branch"
      >
        {{ $t("app.fields.branch") }}*
      </label>
      <InputDropdown
        id="branch"
        v-model="params.branch_id"
        class="default-input"
        :options="branches"
        @update:model-value="onChangeBranch"
      />
    </div>
    <div class="default-field">
      <label
        class="default-label"
        for="time-start"
      >
        {{ $t("app.fields.time") }}
      </label>
      <VueDatepicker
        id="time-start"
        v-model="startDate"
        auto-apply
        class="default-input"
        vertical
      />
      <span class="mx-4">-</span>
      <VueDatepicker
        id="time-start"
        v-model="endDate"
        auto-apply
        class="default-input"
        vertical
      />
    </div>
    <div class="flex">
      <div class="default-field">
        <label
          class="default-label"
          for="call_from"
        >
          {{ $t("app.fields.call_from") }}
        </label>
        <input
          id="call_from"
          v-model="params.call_from_number"
          class="default-input"
          type="text"
        >
      </div>
      <div class="ml-24 default-field">
        <label
          class="default-label"
          for="call_to"
        >
          {{ $t("app.fields.call_to") }}
        </label>
        <input
          id="call_to"
          v-model="params.call_to_number"
          class="default-input"
          type="text"
        >
      </div>
    </div>
    <div class="flex">
      <div class="default-field">
        <label
          class="default-label"
          for="call_duration"
        >
          {{ $t("app.fields.call_duration") }}
        </label>
        <input
          id="call_duration"
          v-model="params.call_duration"
          class="default-input"
          type="number"
        >
      </div>
      <div class="ml-24 default-field">
        <label
          class="default-label"
          for="talk_duration"
        >
          {{ $t("app.fields.talk_duration") }}
        </label>
        <input
          id="talk_duration"
          v-model="params.talk_duration"
          class="default-input"
          type="number"
        >
      </div>
    </div>
    <div class="flex">
      <div class="default-field">
        <label
          class="default-label"
          for="status"
        >
          {{ $t("app.fields.status") }}
        </label>
        <InputDropdown
          id="status"
          v-model="params.status"
          class="default-input"
          label-key="label"
          :options="statusOptions"
          value-key="value"
        />
      </div>
      <div class="ml-24 default-field">
        <input
          id="include_recording"
          v-model="params.has_recording"
          class="default-checkbox"
          type="checkbox"
        >
        <label
          class="default-label"
          for="include_recording"
        >
          {{ $t("app.fields.include_recording") }}
          <PopoverInfo :info="$t('tips.include_recording')" />
        </label>
      </div>
      <div v-if="!isAdvancedSearchOpen">
        <button
          class="info-button ml-64"
          type="submit"
        >
          {{ $t("app.createEdit.search") }}
        </button>
      </div>
    </div>
    <a
      class="flex items-center text-primary-blue cursor-pointer text-sm"
      @click="onToogleAdvancedSearchOpen"
    >
      <ChevronDownIcon
        v-if="!isAdvancedSearchOpen"
        class="w-6 h-6 inline"
      />
      <ChevronUpIcon
        v-else
        class="w-6 h-6 inline"
      />
      <span>Advance Options</span>
    </a>
    <hr>
    <template v-if="isAdvancedSearchOpen">
      <div class="flex mt-4">
        <div class="default-field">
          <label
            class="default-label"
            for="trunk"
          >
            {{ $t("app.fields.trunk") }}
          </label>
          <InputDropdown
            id="trunk"
            v-model="params.trunk"
            class="default-input"
            :options="trunks"
          />
        </div>
        <div class="ml-24 default-field">
          <label
            class="default-label"
            for="communication_type"
          >
            {{ $t("app.fields.communication_type") }}
          </label>
          <InputDropdown
            id="communication_type"
            v-model="params.type"
            class="default-input"
            label-key="label"
            :options="typeOptions"
            value-key="value"
          />
        </div>
      </div>
      <div class="flex">
        <div class="default-field">
          <label
            class="default-label"
            for="pin_code"
          >
            {{ $t("app.fields.pin_code") }}
          </label>
          <input
            id="pin_code"
            v-model="params.pin_code"
            class="default-input"
            type="text"
          >
        </div>
        <div class="ml-24 default-field">
          <input
            id="number_fuzzy_search"
            v-model="params.is_number_fuzzy_search"
            class="default-checkbox"
            type="checkbox"
          >
          <label
            class="default-label"
            for="number_fuzzy_search"
          >
            {{ $t("app.fields.number_fuzzy_search") }}
            <PopoverInfo :info="$t('tips.number_fuzzy_search')" />
          </label>
        </div>
        <div>
          <button
            class="info-button ml-64"
            type="submit"
          >
            {{ $t("app.createEdit.search") }}
          </button>
        </div>
      </div>
    </template>
  </form>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
.default-field {
  .default-label {
    width: 240px;
  }
  .default-input {
    width: 240px;
    flex: none;
  }
}
</style>
