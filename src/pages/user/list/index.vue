<template>
  <DefaultPage :title="$t('app.fields.user')">
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
      <button>
        <CogIcon
          class="w-5 h-5 text-gray-500"
          @click="() => (visibleFieldConfigModal = true)"
        />
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
    <DefaultModal
      v-model="visibleFieldConfigModal"
      description="Please choose the item shown in the list:"
      :has-cancel="false"
      :has-icon="false"
      title="Edit List Options"
      type="info"
      @confirm="onConfirmFieldConfig"
    >
      <div class="mt-6 grid grid-cols-3 gap-4">
        <div
          v-for="field in fields.filter((field) => field.editable !== false)"
          :key="field"
          class="flex field"
        >
          <input
            :id="field.value"
            ref="visibleCheckboxRefs"
            :checked="!field.hidden"
            class="default-checkbox"
            type="checkbox"
          >
          <label
            class="default-label"
            :for="field.value"
          >
            {{ field.name }}
          </label>
        </div>
      </div>
      <template #action>
        <button
          class="default-button mr-6"
          type="button"
          @click="setDefaultFields"
        >
          {{ $t("app.set_default") }}
        </button>
      </template>
    </DefaultModal>
  </DefaultPage>
</template>

<script src="./script.js"></script>
