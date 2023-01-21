<template>
  <DefaultCreateEdit>
    <template #form>
      <form
        class="p-6 overflow-y-auto min-h-[92%] mb-14"
        @submit.prevent="submit"
      >
        <div class="px-4 py-5 bg-white sm:p-6">
          <div>
            <label class="default-label" for="module">
              {{ $t("app.fields.module") }}<sup>*</sup>
            </label>
            <input
              id="module"
              v-model="params.module"
              autocomplete="permission-module"
              class="default-input"
              required
              type="text"
            />
          </div>

          <div class="mt-6">
            <label class="default-label" for="module">
              {{ $t("app.fields.method") }}<sup>*</sup>
            </label>
            <InputDropdown
              v-model="params.method"
              class="default-input"
              :options="methods"
              type="list"
            />
          </div>

          <div class="mt-6">
            <label class="default-label" for="description">
              {{ $t("app.fields.description") }}
            </label>
            <textarea
              id="description"
              v-model="params.description"
              autocomplete="permission-description"
              class="default-input"
              rows="4"
            />
          </div>
        </div>

        <div class="create-edit-submit-container">
          <button
            class="warning-button mr-4"
            type="cancel"
            @click.prevent="reset"
          >
            {{ $t("app.createEdit.cancel") }}
          </button>
          <button class="success-button" :disabled="saveLoading" type="submit">
            <Loading v-if="saveLoading" />
            {{ $t("app.createEdit.save") }}
          </button>
        </div>
      </form>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
