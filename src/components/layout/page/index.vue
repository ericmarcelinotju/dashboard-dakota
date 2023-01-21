<template>
  <div class="divide-y divide-gray-200 lg:col-span-9 px-4 sm:px-6 lg:px-8">
    <div class="p-6 bg-white shadow">
      <div class="mb-6 flex justify-between">
        <div>
          <button
            v-if="hasCreate"
            class="info-button mr-4"
            type="button"
            @click="submitAction('create')"
          >
            <PlusIcon class="w-5 h-5 mr-1" />
            {{ $t("app.components.customSearch.create") }}
          </button>
          <button
            v-if="hasImport"
            class="info-button mr-4"
            type="button"
            @click="submitAction('import')"
          >
            <UploadIcon class="w-5 h-5 mr-1" />
            {{ $t("app.components.customSearch.import") }}
          </button>
          <button
            v-if="hasExport"
            class="default-button mr-4"
            type="button"
            @click="submitAction('export')"
          >
            <DownloadIcon class="w-5 h-5 mr-1" />
            {{ $t("app.components.customSearch.export") }}
          </button>
          <slot name="action" />
        </div>
        <slot name="search" />
      </div>
      <slot name="form" />
      <slot name="table" />
      <slot name="dialog" />
      <slot />
    </div>
  </div>
</template>

<script src="./script.js"></script>
