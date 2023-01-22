<template>
  <DefaultCreateEdit>
    <template #form>
      <div class="overflow-y-auto pb-6">
        <DefaultTabs
          :options="[
            { label: 'Profil Pengguna', value: 'profile' },
            { label: 'Theater Kerja', value: 'workin' },
          ]"
        >
          <template #profile>
            <div class="px-6">
              <div class="default-field mt-6">
                <label class="default-label" for="username">
                  {{ $t("app.fields.username") }}<sup>*</sup>
                </label>
                <input
                  id="username"
                  v-model="params.username"
                  autocomplete="user-username"
                  class="default-input"
                  required
                  type="text"
                />
              </div>

              <div class="grid grid-cols-12 gap-x-12 gap-y-4 mt-6">
                <div class="default-field col-span-6">
                  <label class="default-label" for="first_name">
                    Nama Depan
                  </label>
                  <input
                    id="first_name"
                    v-model="params.firstName"
                    class="default-input"
                    type="text"
                    placeholder="Nama Depan"
                  />
                </div>
                <div class="default-field col-span-6">
                  <label class="default-label" for="last_name">
                    Nama Belakang
                  </label>
                  <input
                    id="last_name"
                    v-model="params.lastName"
                    class="default-input"
                    type="text"
                    placeholder="Nama Belakang"
                  />
                </div>
              </div>

              <div class="default-field mt-6">
                <label class="default-label" for="email">
                  {{ $t("app.fields.email") }}<sup>*</sup>
                </label>
                <input
                  id="email"
                  v-model="params.email"
                  autocomplete="user-email"
                  class="default-input"
                  required
                  type="email"
                />
              </div>

              <div class="default-field mt-6">
                <label class="default-label" for="password"> Kata Sandi </label>
                <input
                  id="password"
                  v-model="params.password"
                  class="default-input"
                  type="password"
                  placeholder="Kata Sandi"
                />
              </div>

              <div class="default-field mt-6">
                <label class="default-label" for="confirm-password">
                  Konfirmasi Kata Sandi
                </label>
                <input
                  id="confirm-password"
                  v-model="params.confirmPassword"
                  class="default-input"
                  type="password"
                  placeholder="Konfirmasi Kata Sandi"
                />
              </div>

              <div
                v-if="hasPermission('GET', 'ROLE')"
                class="default-field mt-6"
              >
                <label class="default-label" for="role_id">
                  {{ $t("app.fields.role") }}
                </label>
                <InputDropdown
                  v-model="params.roleId"
                  class="default-input"
                  :options="roles"
                />
              </div>
              <button
                class="danger-button mt-6"
                :disabled="saveLoading"
                type="submit"
                @click.prevent="submit"
              >
                <Loading v-if="saveLoading" />
                {{ $t("app.createEdit.save") }}
              </button>
            </div>
          </template>
          <template #workin>
            <div class="px-6"></div>
          </template>
        </DefaultTabs>
      </div>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
