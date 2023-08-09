<template>
  <DefaultPage :title="`Film ${theater ? theater.name : ''}`">
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
        <template #picture="{ item }">
          <img
            v-if="item.picture"
            class="w-32"
            :src="item.picture"
          >
        </template>
        <template #genre="{ item }">
          <span class="default-tag">{{ item.genre }}</span>
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
