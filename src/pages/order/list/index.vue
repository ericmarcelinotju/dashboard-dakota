<template>
  <DefaultPage title="Penjualan">
    <template #search>
      <div class="flex">
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-amber-500">
          <p class="text-2xl">5678</p>
          <p class="text-sm">Total Transaksi</p>
        </div>
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-indigo-600">
          <p class="text-2xl">3026</p>
          <p class="text-sm">Transaksi Pending</p>
        </div>
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-blue-700">
          <p class="text-2xl">2652</p>
          <p class="text-sm">Transaksi Berhasil</p>
        </div>
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-sky-400">
          <p class="text-2xl">123</p>
          <p class="text-sm">Transaksi Gagal</p>
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
        @delete="handleDelete"
        @edit="handleEdit"
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
