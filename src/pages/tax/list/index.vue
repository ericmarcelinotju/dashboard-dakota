<template>
  <DefaultPage title="Ringkasan Pengguna">
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
    <template #search>
      <div class="flex">
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-amber-500">
          <p class="text-2xl">5678</p>
          <p class="text-sm">Total Pengguna</p>
        </div>
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-indigo-600">
          <p class="text-2xl">3026</p>
          <p class="text-sm">Pengguna Premium</p>
        </div>
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-blue-700">
          <p class="text-2xl">2652</p>
          <p class="text-sm">Pengguna Basic</p>
        </div>
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-sky-400">
          <p class="text-2xl">123</p>
          <p class="text-sm">Pengguna Baru</p>
        </div>
        <div class="border-r-2 pr-8 pb-8 w-24 mr-8 text-green-600">
          <p class="text-2xl">2345</p>
          <p class="text-sm">Pengguna Melakukan Transaksi</p>
        </div>
      </div>
    </template>
    <template #table>
      <DefaultTable
        :fields="fields"
        :has-delete="hasPermission('delete')"
        :has-edit="hasPermission('update')"
        :items="items"
        :loading="loading"
        :total="itemsTotal"
        @delete="handleDelete"
        @edit="handleEdit"
        @search="handleSearch"
      >
        <template #branches="{ item }">
          <span
            v-for="branch in item.branches"
            :key="branch.id"
            class="default-tag mr-1"
          >
            {{ branch.name }}
          </span>
        </template>
        <template #extensions="{ item }">
          <span>{{ item.extensions?.length }}</span>
        </template>
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
