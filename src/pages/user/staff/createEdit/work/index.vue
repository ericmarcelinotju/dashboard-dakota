<template>
  <div>
    <div class="m-6">
      <label class="font-bold">Riwayat Kerja</label>
      <DefaultTable
        class="mx-6"
        :fields="fields"
        :has-delete="false"
        :has-edit="false"
        :has-pagination="false"
        :items="items"
        :loading="loading"
        :total="itemsTotal"
      >
        <template #theater="{ item }">
          <span>{{ item.theater.name }}</span>
        </template>
        <template #work_period="{ item }">
          <span>{{ item.startDate }} - {{ item.endDate }}</span>
        </template>
      </DefaultTable>
    </div>
    <hr>
    <div class="mt-6 px-6">
      <label class="font-bold">Atur Tempat Kerja</label>
      <div class="default-field mt-4">
        <label
          class="default-label"
          for="theater_id"
        >
          Teater
        </label>
        <InputDropdown
          v-model="params.theaterId"
          class="default-input"
          :options="theaters"
        />
      </div>
      <div class="default-field mt-4">
        <label
          class="default-label"
          for="position"
        >
          Posisi
        </label>
        <input
          id="position"
          v-model="params.position"
          class="default-input"
          required
          type="text"
        >
      </div>

      <div class="default-field mt-4">
        <label
          class="default-label"
          for="work-period"
        >
          Periode Kerja
        </label>
        <Datepicker
          id="work-period"
          v-model="workPeriod"
          auto-apply
          :enable-time-picker="false"
          input-class-name="default-input"
          range
        />
      </div>

      <button
        class="danger-button mt-4"
        :disabled="saveLoading"
        type="submit"
        @click.prevent="submit"
      >
        <Loading v-if="saveLoading" />
        {{ $t("app.createEdit.save") }}
      </button>
    </div>
  </div>
</template>

<script src="./script.js"></script>
