<template>
  <DefaultCreateEdit>
    <template #form>
      <div class="p-6 overflow-y-auto min-h-[92%] mb-14">
        <div class="default-field mt-4">
          <label
            class="default-label"
            for="seats"
          >
            Kapasitas
          </label>
          <div class="flex items-center gap-6">
            <input
              id="row"
              v-model="maxSeat.row"
              class="default-input"
              placeholder="Baris"
              required
              type="number"
            >
            <span>&times;</span>
            <input
              id="column"
              v-model="maxSeat.column"
              class="default-input"
              placeholder="Kolom"
              required
              type="number"
            >
          </div>
        </div>
        <div
          v-if="isSeatChartValid"
          class="default-field mt-4"
        >
          <label
            class="default-label"
            for="seats"
          >
            Kursi
          </label>
          <div
            v-for="row in maxSeat.row"
            :key="row"
            class="flex mt-2"
          >
            <div
              v-for="col in maxSeat.column"
              :key="col"
            >
              <input
                v-model="params.seatChart[row-1][col-1]"
                class="seat-checkbox"
                :false-value="0"
                :true-value="1"
                type="checkbox"
              >
            </div>
          </div>
        </div>
        <div
          v-else
          class="flex items-center justify-center h-64 w-64"
        >
          <Loading class="h-16 w-16 text-gray-500" />
        </div>

        <div class="flex mt-6">
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
