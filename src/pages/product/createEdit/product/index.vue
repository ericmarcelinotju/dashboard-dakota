<template>
  <form
    class="p-6"
    @submit.prevent="submit"
  >
    <div class="default-field">
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
        for="nama"
      >
        Nama Produk<sup>*</sup>
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
        for="uom"
      >
        Satuan Ukuran
      </label>
      <input
        id="uom"
        v-model="params.uom"
        class="default-input"
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
      />
    </div>

    <div class="grid grid-cols-12 gap-x-12 gap-y-4 mt-4">
      <div class="default-field col-span-6">
        <label
          class="default-label"
          for="listPrice"
        >
          Harga Dicoret<sup>*</sup>
        </label>
        <input
          id="listPrice"
          v-model="params.listPrice"
          class="default-input"
          required
          type="number"
        >
      </div>
      <div class="default-field col-span-6">
        <label
          class="default-label"
          for="purchasePrice"
        >
          Harga<sup>*</sup>
        </label>
        <input
          id="purchasePrice"
          v-model="params.purchasePrice"
          class="default-input"
          required
          type="number"
        >
      </div>
    </div>

    <div
      class="default-field mt-4"
    >
      <label
        class="default-label"
        for="role_id"
      >
        Kategori
      </label>
      <InputDropdown
        v-model="params.categoryId"
        class="default-input"
        :options="categories"
      />
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
