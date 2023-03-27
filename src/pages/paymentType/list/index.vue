<template>
  <DefaultPage>
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
