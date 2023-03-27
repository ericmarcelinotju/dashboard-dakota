<template>
  <DefaultCreateEdit>
    <template #form>
      <div class="h-[92%]">
        <DefaultTabs :options="tabOptions">
          <template #profile>
            <div class="px-6">
              <div class="default-field mt-4">
                <InputAvatar v-model="params.avatar" />
              </div>
              <div class="default-field mt-4">
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

              <div class="grid grid-cols-12 gap-x-12 gap-y-4 mt-4">
                <div class="default-field col-span-6">
                  <label
                    class="default-label"
                    for="first_name"
                  >
                    Nama Depan
                  </label>
                  <input
                    id="first_name"
                    v-model="params.firstName"
                    class="default-input"
                    placeholder="Nama Depan"
                    type="text"
                  >
                </div>
                <div class="default-field col-span-6">
                  <label
                    class="default-label"
                    for="last_name"
                  >
                    Nama Belakang
                  </label>
                  <input
                    id="last_name"
                    v-model="params.lastName"
                    class="default-input"
                    placeholder="Nama Belakang"
                    type="text"
                  >
                </div>
              </div>

              <div class="default-field mt-4">
                <label
                  class="default-label"
                  for="phone_number"
                >
                  Nomor HP<sup>*</sup>
                </label>
                <input
                  id="phone_number"
                  v-model="params.phone"
                  class="default-input"
                  required
                  type="text"
                >
              </div>

              <div class="default-field mt-4">
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

              <div class="default-field mt-4">
                <label
                  class="default-label"
                  for="address"
                >
                  Alamat sesuai KTP
                </label>
                <input
                  id="address"
                  v-model="params.address"
                  class="default-input"
                  required
                  type="text"
                >
              </div>

              <div class="default-field mt-4">
                <label
                  class="default-label"
                  for="province"
                >
                  Provinsi
                </label>
                <input
                  id="province"
                  v-model="params.province"
                  class="default-input"
                  required
                  type="text"
                >
              </div>

              <div class="default-field mt-4">
                <label
                  class="default-label"
                  for="city"
                >
                  Kota / Kabupaten
                </label>
                <input
                  id="city"
                  v-model="params.city"
                  class="default-input"
                  required
                  type="text"
                >
              </div>

              <div class="default-field mt-4">
                <label
                  class="default-label"
                  for="gender"
                >
                  Jenis Kelamin
                </label>
                <input
                  id="gender"
                  v-model="params.gender"
                  class="default-input"
                  required
                  type="text"
                >
              </div>

              <div class="default-field mt-4">
                <label
                  class="default-label"
                  for="dob"
                >
                  Tanggal Lahir
                </label>
                <Datepicker
                  id="dob"
                  v-model="params.dob"
                  auto-apply
                  :enable-time-picker="false"
                  input-class-name="default-input"
                />
              </div>

              <div class="default-field mt-4">
                <label
                  class="default-label"
                  for="password"
                > Kata Sandi </label>
                <input
                  id="password"
                  v-model="params.password"
                  class="default-input"
                  placeholder="Kata Sandi"
                  type="password"
                >
              </div>

              <div class="default-field mt-4">
                <label
                  class="default-label"
                  for="confirm-password"
                >
                  Konfirmasi Kata Sandi
                </label>
                <input
                  id="confirm-password"
                  v-model="params.confirmPassword"
                  class="default-input"
                  placeholder="Konfirmasi Kata Sandi"
                  type="password"
                >
              </div>

              <div
                v-if="hasPermission('GET', 'ROLE')"
                class="default-field mt-4"
              >
                <label
                  class="default-label"
                  for="role_id"
                >
                  {{ $t("app.fields.role") }}
                </label>
                <InputDropdown
                  v-model="params.roleId"
                  class="default-input"
                  :options="roles"
                />
              </div>

              <button
                class="danger-button mt-4"
                :disabled="saveLoading"
                type="submit"
                @click.prevent="submit"
              >
                <Loading v-if="saveLoading" />
                {{ $t("app.createEdit.save") }}
              </button>
            </div>
          </template>
          <template #active_transaction>
            <p>Active Transaction</p>
          </template>
          <template #history_transaction>
            <p>History Transaction</p>
          </template>
          <template #point>
            <p>DC Point</p>
          </template>
          <template #deposit>
            <p>Deposit</p>
          </template>
        </DefaultTabs>
      </div>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
