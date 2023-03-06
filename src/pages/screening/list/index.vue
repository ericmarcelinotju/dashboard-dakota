<template>
  <DefaultPage :title="`Pemutaran Film ${theater.name}`">
    <template #action>
      <button
        v-if="hasPermission('POST')"
        class="danger-button mr-4"
        type="button"
        @click="handleCreate"
      >
        <CogIcon class="w-4 h-4 mr-1" />
        ATUR PEMUTARAN FILM
      </button>
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
        <template #date="{ item }">
          <span>{{ `${item.date} - ${item.time}` }}</span>
        </template>
        <template #movie="{ item }">
          <span>{{ item.movie ? item.movie.title : "" }}</span>
        </template>
        <template #studio="{ item }">
          <span>{{ item.studio ? item.studio.name : "" }}</span>
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
