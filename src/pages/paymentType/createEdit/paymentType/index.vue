<template>
  <form
    class="p-6"
    @submit.prevent="submit"
  >
    <div class="default-field">
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
        for="nama"
      >
        Nama Tipe Pembayaran<sup>*</sup>
      </label>
      <input
        id="nama"
        v-model="params.name"
        class="default-input"
        required
        type="text"
      >
    </div>

    <div class="default-field mt-4">
      <label
        class="default-label"
        for="provider"
      >
        Provider
      </label>
      <select
        id="provider"
        v-model="params.provider"
        class="default-input"
      >
        <option value="bri">
          BRI
        </option>
        <option value="midtrans">
          Midtrans
        </option>
      </select>
    </div>

    <div class="default-field mt-4">
      <label
        class="default-label"
        for="description"
      >
        Deskripsi
      </label>
      <textarea
        id="description"
        v-model="params.description"
        class="default-input"
      />
    </div>

    <div class="default-field mt-4">
      <label
        class="default-label"
        for="clientId"
      >
        Client ID
      </label>
      <input
        id="clientId"
        v-model="params.clientId"
        class="default-input"
        type="text"
      >
    </div>

    <div class="default-field mt-4">
      <label
        class="default-label"
        for="clientKey"
      >
        Client Key
      </label>
      <textarea
        id="clientKey"
        v-model="params.clientKey"
        class="default-input"
      />
    </div>

    <div class="default-field mt-4">
      <label
        class="default-label"
        for="serverKey"
      >
        Server Key
      </label>
      <textarea
        id="serverKey"
        v-model="params.serverKey"
        class="default-input"
      />
    </div>

    <div class="grid grid-cols-12 gap-x-12 gap-y-4 mt-4">
      <div class="default-field col-span-6">
        <label
          class="default-label"
          for="merchantId"
        >
          Merchant ID
        </label>
        <input
          id="merchantId"
          v-model="params.merchantId"
          class="default-input"
          type="text"
        >
      </div>
      <div class="default-field col-span-6">
        <label
          class="default-label"
          for="terminalId"
        >
          Terminal ID
        </label>
        <input
          id="terminalId"
          v-model="params.terminalId"
          class="default-input"
          type="text"
        >
      </div>
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

<script src="./script.js"></script>
