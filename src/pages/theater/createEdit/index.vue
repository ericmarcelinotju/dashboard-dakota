<template>
  <DefaultCreateEdit>
    <template #form>
      <form
        class="p-6 overflow-y-auto min-h-[92%]"
        @submit.prevent="submit"
      >
        <div class="default-field mt-4">
          <InputImage
            id="image"
            v-model="params.image"
            label="Unggah Gambar"
            reset-label="Hapus Gambar"
          />
        </div>
        <div class="default-field mt-4">
          <label
            class="default-label"
            for="code"
          >
            Kode<sup>*</sup>
          </label>
          <input
            id="code"
            v-model="params.code"
            class="default-input"
            required
            type="text"
          >
        </div>

        <div class="default-field mt-4">
          <label
            class="default-label"
            for="name"
          >
            Name<sup>*</sup>
          </label>
          <input
            id="name"
            v-model="params.name"
            class="default-input"
            required
            type="text"
          >
        </div>

        <div class="default-field mt-4">
          <label
            class="default-label"
            for="phone"
          >
            Nomor Telepon
          </label>
          <input
            id="phone"
            v-model="params.phone"
            class="default-input"
            type="text"
          >
        </div>

        <hr class="mt-6">

        <div class="grid grid-cols-12 gap-x-12 gap-y-4 mt-4">
          <div class="default-field col-span-6">
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
              type="text"
            >
          </div>
          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="city"
            >
              City
            </label>
            <input
              id="city"
              v-model="params.city"
              class="default-input"
              type="text"
            >
          </div>
          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="street"
            >
              Jalan
            </label>
            <input
              id="street"
              v-model="params.street"
              class="default-input"
              type="text"
            >
          </div>
          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="zip-code"
            >
              Kode ZIP
            </label>
            <input
              id="zip-code"
              v-model="params.zipCode"
              class="default-input"
              type="number"
            >
          </div>

          <hr class="col-span-12">

          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="bank-name"
            >
              Nama Bank
            </label>
            <input
              id="bank-name"
              v-model="params.bankName"
              class="default-input"
              type="text"
            >
          </div>

          <div class="default-field col-span-6">
            <label
              class="default-label"
              for="bank-account"
            >
              Nomor Rekening Bank
            </label>
            <input
              id="bank-account"
              v-model="params.bankAccount"
              class="default-input"
              type="number"
            >
          </div>
        </div>

        <div class="default-field mt-4">
          <label
            class="default-label"
            for="database"
          >
            Database
          </label>
          <input
            id="database"
            v-model="params.databaseName"
            class="default-input"
            type="text"
          >
        </div>

        <div class="create-edit-submit-container">
          <button
            class="danger-button"
            :disabled="saveLoading"
            type="submit"
          >
            <Loading v-if="saveLoading" />
            Simpan
          </button>
        </div>
      </form>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
