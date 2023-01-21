<template>
  <DefaultPage :title="$t('app.fields.permission')">
    <template #action>
      <button
        v-if="hasPermission('POST')"
        class="info-button mr-4"
        type="button"
        @click="handleCreate"
      >
        <PlusIcon class="w-4 h-4 mr-1" />
        {{ $t("app.components.customSearch.create") }}
      </button>
    </template>
    <!-- <template #search>
      <DefaultSearch
        :fields="fields"
        :loading="loading"
        @search="handleSearch"
      />
    </template> -->
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
      />
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
