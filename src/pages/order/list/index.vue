<template>
  <DefaultPage :title="`Penjualan ${theater ? theater.name : ''}`">
    <template #search>
      <div class="flex">
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-amber-500">
          <p class="text-2xl">
            {{ orderStatistics.total }}
          </p>
          <p class="text-sm">
            Total Transaksi
          </p>
        </div>
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-indigo-600">
          <p class="text-2xl">
            {{ orderStatistics.pendingTotal }}
          </p>
          <p class="text-sm">
            Transaksi Pending
          </p>
        </div>
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-blue-700">
          <p class="text-2xl">
            {{ orderStatistics.settleTotal }}
          </p>
          <p class="text-sm">
            Transaksi Berhasil
          </p>
        </div>
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-sky-400">
          <p class="text-2xl">
            {{ orderStatistics.failedTotal }}
          </p>
          <p class="text-sm">
            Transaksi Gagal
          </p>
        </div>
      </div>
    </template>
    <template #action>
      <button
        v-if="hasPermission('create')"
        class="danger-button mr-4"
        type="button"
        @click="handleCreate"
      >
        <PlusIcon class="w-4 h-4 mr-1" />
        TAMBAH BARU
      </button>
    </template>
    <template #filter>
      <div class="mt-4">
        <div class="default-field w-[240px]">
          <label
            class="default-label"
            for="type"
          >
            Tipe Transaksi
          </label>
          <InputDropdown
            v-model="params.type"
            class="default-input"
            :options="[
              {
                id: null,
                name: 'Semua'
              },
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
        <template #user="{ item }">
          <span>{{ item.user?.username }}</span>
        </template>
        <template #status="{ item }">
          <span class="default-tag">{{ item.status }}</span>
        </template>
        <template #view="{ item }">
          <div class="action">
            <a @click="handleDetail(item)"> Lihat </a>
          </div>
        </template>
      </DefaultTable>
    </template>
  </DefaultPage>
</template>

<script src="./script.js"></script>
