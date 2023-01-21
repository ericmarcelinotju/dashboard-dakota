<template>
  <DefaultPage :title="title">
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
        <template #time="{ item }">
          <span class="default-tag">
            {{ item.created_at }}
          </span>
        </template>
        <template #level="{ item }">
          <span :class="`${item.level}-tag`">
            {{ item.level }}
          </span>
        </template>
        <template #type="{ item }">
          <span class="default-tag">
            {{ item.type }}
          </span>
        </template>
        <template #content="{ item }">
          <a
            class="content"
            @click="handleDetail(item)"
          >
            <EyeIcon class="h-6 w-6 mr-1" />
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
      <DefaultModal
        v-model="visibleDetailConfirmationModal"
        :description="detailItem.subject"
        :has-cancel="false"
        :title="detailItem.title"
        :type="detailItem.level"
      >
        <div
          class="mt-4"
          v-html="detailItem.content"
        />
      </DefaultModal>
    </template>
  </DefaultPage>
</template>

<script src="./script.js"></script>
