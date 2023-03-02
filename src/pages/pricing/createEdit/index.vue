<template>
  <DefaultCreateEdit>
    <template #form>
      <div class="p-6 overflow-y-auto min-h-[92%] mb-14">
        <div class="default-field">
          <label
            class="default-label"
            for="code"
          >
            Kode Pricing<sup>*</sup>
          </label>
          <input
            id="code"
            v-model="params.code"
            class="default-input"
            required
            type="text"
          >
        </div>

        <div class="default-field mt-6">
          <label
            class="default-label"
            for="name"
          >
            Nama Pricing<sup>*</sup>
          </label>
          <input
            id="name"
            v-model="params.name"
            autocomplete="user-name"
            class="default-input"
            required
            type="text"
          >
        </div>

        <div class="default-field mt-6">
          <label
            class="default-label"
            for="weekdayPrice"
          >
            Harga Hari Kerja<sup>*</sup>
          </label>
          <input
            id="weekdayPrice"
            v-model="params.weekdayPrice"
            class="default-input"
            required
            type="number"
          >
        </div>

        <div class="default-field mt-6">
          <label
            class="default-label"
            for="weekendPrice"
          >
            Harga Hari Pekan<sup>*</sup>
          </label>
          <input
            id="weekendPrice"
            v-model="params.weekendPrice"
            class="default-input"
            required
            type="number"
          >
        </div>

        <div class="default-field mt-6">
          <label
            class="default-label"
            for="holidayPrice"
          >
            Harga Hari Libur<sup>*</sup>
          </label>
          <input
            id="holidayPrice"
            v-model="params.holidayPrice"
            class="default-input"
            required
            type="number"
          >
        </div>

        <div class="flex mt-4">
          <button
            class="warning-button mr-4"
            type="cancel"
            @click.prevent="reset"
          >
            Reset
          </button>
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
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
