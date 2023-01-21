<template>
  <DefaultPage :title="$t('app.fields.extension')">
    <template #search>
      <ExtensionSearch @search="handleSearch" />
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
        <template #branch="{ item }">
          <span>
            {{ item.branch.name }}
          </span>
        </template>
        <template #sync="{ item }">
          <a
            class="sync"
            @click="handleSync(item)"
          >
            <RefreshIcon
              class="h-6 w-6 mr-1"
              :class="{ 'animate-spin': loadingSync }"
            />
          </a>
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
