<template>
  <form
    class="p-6 overflow-y-auto min-h-[92%]"
    @submit.prevent="submit"
  >
    <div class="default-field">
      <label
        class="default-label"
        for="code"
      >
        Kode Tipe Pembayaran<sup>*</sup>
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
        Nama<sup>*</sup>
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
        for="description"
      >
        Deskripsi
      </label>
      <textarea
        id="description"
        v-model="params.description"
        class="default-input"
        required
      />
    </div>

    <div class="grid grid-cols-12 gap-x-12 gap-y-4 mt-4">
      <div class="default-field col-span-6">
        <label
          class="default-label"
          for="provider"
        >
          Provider<sup>*</sup>
        </label>
        <select
          id="provider"
          v-model="params.provider"
          class="default-input"
          required
        >
          <option value="bri">BRI</option>
          <option value="midtrans">Midtrans</option>
        </select>
      </div>
      <div class="default-field col-span-6">
        <label
          class="default-label"
          for="method"
        >
          Metode<sup>*</sup>
        </label>
        <select
          id="method"
          v-model="params.method"
          class="default-input"
          required
        >
          <option value="qrcode">QRCode</option>
        </select>
      </div>
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
      />
    </div>

    <div class="default-field mt-4">
      <label
        class="default-label"
        for="clientKey"
      >
        Client Key
      </label>
      <input
        id="clientKey"
        v-model="params.clientKey"
        class="default-input"
        type="text"
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

    <div class="default-field mt-4">
      <label
        class="default-label"
        for="environment"
      >
        Environment<sup>*</sup>
      </label>
      <select
        id="environment"
        v-model="params.environment"
        class="default-input"
        required
      >
        <option value="sandbox">Sandbox</option>
        <option value="production">Production</option>
      </select>
    </div>

    <div class="flex mt-4">
      <button
        class="warning-button mr-4"
        type="cancel"
        @click.prevent="reset"
      >
        Reset
      </button>
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
