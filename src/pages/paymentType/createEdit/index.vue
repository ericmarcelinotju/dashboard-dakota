<template>
  <DefaultCreateEdit>
    <template #form>
      <div class="p-6 overflow-y-auto min-h-[92%] mb-14">
        <DefaultTabs
          :options="[
            { label: 'Information', value: 'information' },
            { label: 'Branches', value: 'branches' },
            { label: 'Extensions', value: 'extensions' },
          ]"
        >
          <template #information>
            <div class="default-field mt-6">
              <label
                class="default-label"
                for="username"
              >
                {{ $t("app.fields.username") }}<sup>*</sup>
              </label>
              <input
                id="username"
                v-model="params.username"
                autocomplete="user-username"
                class="default-input"
                required
                type="text"
              >
            </div>

            <div class="grid grid-cols-12 gap-x-24 gap-y-4 mt-6">
              <div class="default-field col-span-6">
                <label
                  class="default-label"
                  for="first_name"
                >
                  {{ $t("app.fields.first_name") }}
                </label>
                <input
                  id="first_name"
                  v-model="params.first_name"
                  class="default-input"
                  type="text"
                >
              </div>
              <div class="default-field col-span-6">
                <label
                  class="default-label"
                  for="last_name"
                >
                  {{ $t("app.fields.last_name") }}
                </label>
                <input
                  id="last_name"
                  v-model="params.last_name"
                  class="default-input"
                  type="text"
                >
              </div>

              <div class="default-field col-span-6">
                <label
                  class="default-label"
                  for="department"
                >
                  {{ $t("app.fields.department") }}
                </label>
                <input
                  id="department"
                  v-model="params.department"
                  class="default-input"
                  type="text"
                >
              </div>

              <div class="default-field col-span-6">
                <label
                  class="default-label"
                  for="title"
                >
                  {{ $t("app.fields.title") }}
                </label>
                <input
                  id="title"
                  v-model="params.title"
                  class="default-input"
                  type="text"
                >
              </div>
            </div>

            <div class="default-field mt-6">
              <label
                class="default-label"
                for="email"
              >
                {{ $t("app.fields.email") }}<sup>*</sup>
              </label>
              <input
                id="email"
                v-model="params.email"
                autocomplete="user-email"
                class="default-input"
                required
                type="email"
              >
            </div>

            <div class="default-field mt-6">
              <label
                class="default-label"
                for="password"
              >
                {{ $t("app.fields.password") }}
              </label>
              <input
                id="password"
                v-model="params.password"
                class="default-input"
                type="password"
              >
            </div>

            <div class="default-field mt-6">
              <label
                class="default-label"
                for="confirm-password"
              >
                {{ $t("app.fields.confirmPassword") }}
              </label>
              <input
                id="confirm-password"
                v-model="params.confirm_password"
                class="default-input"
                type="password"
              >
            </div>

            <div
              v-if="hasPermission('GET', 'ROLE')"
              class="default-field mt-6"
            >
              <label
                class="default-label"
                for="role_id"
              >
                {{ $t("app.fields.role") }}
              </label>
              <InputDropdown
                v-model="params.role_id"
                class="default-input"
                :options="roles"
              />
            </div>
          </template>
          <template #branches>
            <InputDualList
              v-model="params.branches"
              :options="branches"
            >
              <template #label="{ item }">
                {{ item.name }}
              </template>
            </InputDualList>
          </template>
          <template #extensions>
            <!-- Start Extension filter -->
            <div
              v-if="hasPermission('GET', 'BRANCH')"
              class="default-field mt-4 w-1/2"
            >
              <label
                class="default-label"
                for="branch_id"
              >
                {{ $t("app.fields.branch") }}
              </label>
              <InputDropdown
                v-model="filter.branch_id"
                class="default-input"
                :options="params.branches"
              />
            </div>
            <!-- End Extension filter -->

            <InputDualList
              v-model="params.extensions"
              class="mt-6"
              label-key="number"
              :options="extensionOptions"
            >
              <template #label="{ item }">
                ({{ item.branch_name }})&nbsp;
                {{ item.username }}
                &nbsp;&lt;{{ item.number }}&gt;
              </template>
            </InputDualList>
          </template>
        </DefaultTabs>
        <div class="create-edit-submit-container">
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
            @click.prevent="submit"
          >
            <Loading v-if="saveLoading" />
            {{ $t("app.createEdit.save") }}
          </button>
        </div>
      </div>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
