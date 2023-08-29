<template>
  <DefaultPage title="Laporan Penjualan">
    <template #action>
      <button
        class="danger-button mr-4"
        type="button"
        @click="handleDownload"
      >
        <Loading v-if="loading" />
        <DownloadIcon class="w-4 h-4 mr-1" />
        Unduh Laporan
      </button>
    </template>
    <template #search>
      <div class="grid grid-cols-2 gap-6">
        <div class="defult-field">
          <label
            class="default-label w-32"
            for="theater_id"
          >
            Tipe Transaksi
          </label>
          <InputDropdown
            v-model="filter.type"
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
          />
        </div>
        <div class="defult-field">
          <label
            class="default-label w-32"
            for="start_date"
          >
            Order Period
          </label>
          <Datepicker
            v-model="filterPeriod"
            auto-apply
            :clearable="false"
            :enable-time-picker="false"
            input-class-name="default-input"
            range
          />
        </div>
      </div>
    </template>
    <template #table>
      <DefaultTable
        :fields="fields"
        :has-delete="false"
        :has-edit="false"
        :items="items"
        :loading="loading"
        :total="itemsTotal"
        @search="handleSearch"
      >
        <template #name="{ item }">
          <span v-if="item.type === 'product'">{{ item.product.name }}</span>
          <span v-else-if="item.type === 'ticket'">{{ item.movie.title }}</span>
        </template>
      </DefaultTable>
    </template>
  </DefaultPage>
</template>

<script src="./script.js"></script>
