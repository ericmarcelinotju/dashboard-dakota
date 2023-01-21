<template>
  <DefaultCreateEdit>
    <template #form>
      <form
        class="p-6 overflow-y-auto min-h-[92%] mb-14"
        @submit.prevent="submit"
      >
        <div class="px-4 py-5 bg-white sm:p-6">
          <div>
            <label class="default-label" for="name">
              {{ $t("app.fields.name") }}<sup>*</sup>
            </label>
            <input
              id="name"
              v-model="params.name"
              autocomplete="role-name"
              class="default-input"
              required
              type="text"
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

          <div class="grid grid-cols-5 gap-4 mt-6">
            <div />
            <div
              v-for="method in ['GET', 'POST', 'PUT', 'DELETE']"
              :key="method"
              class="text-center mr-4"
            >
              {{ method }}
            </div>
          </div>
          <div
            v-for="(module, index) in mappedPermissions"
            :key="index"
            class="grid grid-cols-5 gap-4 mt-2 pb-1 border-b border-gray-300"
          >
            <h5>
              {{ module.name }}
            </h5>
            <div
              v-for="method in ['GET', 'POST', 'PUT', 'DELETE']"
              :key="method"
              class="default-label text-center"
            >
              <input
                v-if="module.permissions[method]"
                v-model.number="params.permissions"
                class="default-checkbox"
                type="checkbox"
                :value="module.permissions[method]"
              />
            </div>
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
