<template>
  <DefaultPage title="Ringkasan Pengguna">
    <template #action>
      <button
        v-if="hasPermission('POST')"
        class="danger-button mr-4"
        type="button"
        @click="handleCreate"
      >
        <PlusIcon class="w-4 h-4 mr-1" />
        TAMBAH BARU
      </button>
    </template>
    <template #search>
      <div class="flex">
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-amber-500">
          <p class="text-2xl">{{ userStatistics.total }}</p>
          <p class="text-sm">Total Pengguna</p>
        </div>
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-indigo-600">
          <p class="text-2xl">{{ userStatistics.activeTotal }}</p>
          <p class="text-sm">Pengguna Yang Telah Bertransaksi</p>
        </div>
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-blue-700">
          <p class="text-2xl">{{ userStatistics.inActiveTotal }}</p>
          <p class="text-sm">Pengguna Tidak Aktif</p>
        </div>
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-sky-400">
          <p class="text-2xl">{{ userStatistics.newTotal }}</p>
          <p class="text-sm">Pengguna Baru Minggu Ini</p>
        </div>
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-green-600">
          <p class="text-2xl">{{ userStatistics.transactingTotal }}</p>
          <p class="text-sm">Pengguna Melakukan Transaksi Minggu Ini</p>
        </div>
      </div>
    </template>
    <template #table>
      <DefaultTable
        :fields="fields"
        :has-delete="hasPermission('DELETE')"
        :has-edit="hasPermission('PUT')"
        :items="items"
        :loading="loading"
        :total="itemsTotal"
        @delete="handleDelete"
        @edit="handleEdit"
        @search="handleSearch"
      >
        <template #role="{ item }">
          <span>{{ item.role.name }}</span>
        </template>
        <template #last_login="{ item }">
          <span>{{ item.last_login }}</span>
        </template>
      </DefaultTable>
    </template>
    <template #dialog>
      <DefaultModal
        v-model="visibleDeleteConfirmationModal"
        :loading="loadingDelete"
        type="danger"
        @confirm="confirmDelete"
      />
    </template>
  </DefaultPage>
</template>

<script src="./script.js"></script>
