<template>
  <div class="p-6 overflow-y-auto min-h-[92%] mb-14">
    <div class="default-field">
      <label class="default-label">Pilih Bulan & Tahun</label>
      <Datepicker
        id="year-month"
        v-model="yearMonth"
        auto-apply
        :clearable="false"
        input-class-name="default-input"
        month-picker
      />
    </div>
    <div class="default-field mt-4">
      <label class="default-label">Pilih Hari Libur</label>
      <Datepicker
        id="holidays"
        v-model="params.holidays"
        disable-month-year-select
        :enable-time-picker="false"
        hide-offset-dates
        input-class-name="default-input"
        :max-date="maxDate"
        :min-date="minDate"
        multi-dates
        :start-date="minDate"
      />
    </div>
    <div class="flex mt-4">
      <button
        class="danger-button"
        :disabled="saveLoading"
        type="submit"
        @click.prevent="submit"
      >
        <Loading v-if="saveLoading" />
        Simpan
      </button>
    </div>
  </div>
</template>

<script src="./script.js"></script>
