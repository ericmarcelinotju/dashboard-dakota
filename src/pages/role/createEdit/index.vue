<template>
  <DefaultCreateEdit>
    <template #form>
      <DefaultTabs
        :options="[
          { label: 'Peran', value: 'role' },
          { label: 'Pengurus', value: 'user' },
        ]"
      >
        <template #role>
          <form class="overflow-y-auto" @submit.prevent="submit">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="default-field">
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

              <div class="default-field mt-6">
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

              <div class="flex mt-6">
                <input
                  v-model="params.isCustomer"
                  id="is_customer"
                  class="default-checkbox"
                  type="checkbox"
                />
                <label class="default-label" for="is_customer">
                  Is Customer?
                </label>
              </div>

              <div class="grid grid-cols-5 gap-4 mt-6">
                <div />
                <div
                  v-for="action in ['read', 'create', 'update', 'delete']"
                  :key="action"
                  class="text-center mr-4"
                >
                  {{ action }}
                </div>
              </div>
              <div
                v-for="(feature, index) in mappedPermissions"
                :key="index"
                class="
                  grid grid-cols-5
                  gap-4
                  mt-2
                  pb-1
                  border-b border-gray-300
                "
              >
                <h5>
                  {{ feature.name }}
                </h5>
                <div
                  v-for="action in ['read', 'create', 'update', 'delete']"
                  :key="action"
                  class="default-label text-center"
                >
                  <input
                    v-if="feature.permissions[action]"
                    v-model.number="params.permissions"
                    class="default-checkbox"
                    type="checkbox"
                    :value="feature.permissions[action]"
                  />
                </div>
              </div>
              <div>
                <button
                  class="warning-button mr-4"
                  type="cancel"
                  @click.prevent="reset"
                >
                  {{ $t("app.createEdit.cancel") }}
                </button>
                <button
                  class="success-button"
                  :disabled="saveLoading"
                  type="submit"
                >
                  <Loading v-if="saveLoading" />
                  {{ $t("app.createEdit.save") }}
                </button>
              </div>
            </div>
          </form>
        </template>
        <template #user> </template>
      </DefaultTabs>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
