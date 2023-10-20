<template>
  <DefaultCreateEdit>
    <template #form>
      <div class="p-6 overflow-y-auto min-h-[92%] mb-14">
        <div class="default-field">
          <label
            class="default-label"
            for="type"
          >
            Tipe<sup>*</sup>
          </label>
          <InputDropdown
            v-model="params.type"
            class="default-input"
            :options="[
              {
                id: 'ticket',
                name: 'Tiket'
              },
              {
                id: 'product',
                name: 'Kafetaria'
              }
            ]"
            @input="onTypeChange"
          />
        </div>
        <template v-if="params.type">
          <template v-if="params.type === 'ticket'">
            <div class="grid grid-cols-2 gap-6">
              <div class="default-field mt-6">
                <label
                  class="default-label"
                  for="type"
                >
                  Film<sup>*</sup>
                </label>
                <InputDropdown
                  v-model="params.movieId"
                  class="default-input"
                  label-key="title"
                  :options="movies"
                  @input="onMovieChange"
                />
              </div>
              <div class="default-field mt-6">
                <label
                  class="default-label"
                  for="screening"
                >
                  Jam Tayang<sup>*</sup>
                </label>
                <InputDropdown
                  v-model="params.screeningId"
                  class="default-input"
                  label-key="time"
                  :options="screenings"
                  @input="onScreeningChange"
                />
              </div>
            </div>
            <div
              v-if="tickets.length > 0"
              class="default-field mt-4"
            >
              <label
                class="default-label"
                for="seats"
              >
                Kursi {{ screening?.studio?.name }}
              </label>
              <div
                v-for="ticketRow in tickets"
                :key="ticketRow"
                class="flex mt-2 ml-1"
              >
                <div
                  v-for="ticket in ticketRow"
                  :key="ticket"
                  class="relative"
                >
                  {{ ticket?.seat }}
                  <input
                    class="seat-checkbox"
                    :class="{'unavailable': ticket?.status !== 'available'}"
                    :disabled="!ticket?.seat?.isActive || ticket?.status !== 'available'"
                    type="checkbox"
                    @input="onCheckSeat($event, ticket?.seat)"
                  >
                  <span class="absolute left-[6px] top-[6px] text-xs font-semibold pointer-events-none">{{ ticket?.seat?.name }}</span>
                </div>
              </div>
              <div
                class="mt-4 py-1 rounded-md bg-gray-400 text-white font-semibold text-center"
                :style="`width: ${36 * tickets[0].length}px`"
              >
                Layar
              </div>
            </div>
          </template>
          <template v-else-if="params.type === 'product'">
            <div
              v-for="item, i in params.items"
              :key="item"
              class="flex gap-6 mt-6"
            >
              <div class="default-field flex-1">
                <label
                  class="default-label"
                  for="name"
                >
                  Produk<sup>*</sup>
                </label>
                <InputDropdown
                  v-model="item.productId"
                  class="default-input"
                  :options="products"
                />
              </div>
              <div class="default-field w-36">
                <label
                  class="default-label"
                  for="weekdayPrice"
                >
                  Kuantitas<sup>*</sup>
                </label>
                <input
                  id="weekdayPrice"
                  v-model="item.qty"
                  class="default-input"
                  required
                  type="number"
                >
              </div>

              <div class="flex justify-end mb-2 pt-7">
                <button
                  class="danger-button"
                  type="button"
                  @click="deleteItem(i)"
                >
                  <TrashIcon class="w-4 h-4" />
                </button>
              </div>
            </div>

            <div class="default-field mt-6">
              <button
                class="info-button"
                type="button"
                @click="addItem"
              >
                <PlusIcon class="w-4 h-4 mr-1" />
                Tambah Item
              </button>
            </div>
          </template>
        </template>

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
