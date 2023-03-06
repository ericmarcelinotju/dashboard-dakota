<template>
  <DefaultCreateEdit>
    <template #form>
      <div class="p-6 overflow-y-auto min-h-[92%] mb-14">
        <div class="default-field">
          <label
            class="default-label"
            for="studio_id"
          >
            Studio<sup>*</sup>
          </label>
          <InputDropdown
            v-model="params.studioId"
            class="default-input"
            :options="studios"
          />
        </div>

        <div class="default-field mt-4">
          <label
            class="default-label"
            for="date"
          >
            Tanggal<sup>*</sup>
          </label>
          <Datepicker
            id="date"
            v-model="params.date"
            auto-apply
            :enable-time-picker="false"
            input-class-name="default-input"
          />
        </div>

        <div
          v-if="params.studioId && params.date"
          class="default-field mt-4"
        >
          <InputCalendarDay
            v-model="events"
            @calendar-click="onCalendarClick"
            @event-delete="onEventDelete"
          />
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
  <DefaultModal
    v-model="visibleAddScreeningModal"
    type="info"
    title="Pilih Film"
    :description="`Pilih film yang akan diputar jam ${activeScreening.hour?.toString().padStart(2, '0')}:${activeScreening.minute?.toString().padStart(2, '0')}`"
    :has-cancel="false"
    :has-confirm="false"
  >
    <div class="default-field mt-4">
      <InputDropdown
        v-model="activeMovie"
        class="default-input"
        label-key="title"
        :options="movies"
        @input="onMovieChange"
      />
    </div>
  </DefaultModal>
</template>

<script src="./script.js"></script>
