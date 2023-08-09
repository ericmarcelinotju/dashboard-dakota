<template>
  <DefaultCreateEdit>
    <template #form>
      <div class="p-6 overflow-y-auto min-h-[92%] mb-14">
        <div class="default-field">
          <label
            class="default-label"
            for="code"
          >
            Kode Studio<sup>*</sup>
          </label>
          <input
            id="code"
            v-model="params.code"
            class="default-input"
            required
            type="text"
          >
        </div>

        <div class="default-field mt-6">
          <label
            class="default-label"
            for="name"
          >
            Nama Studio<sup>*</sup>
          </label>
          <input
            id="name"
            v-model="params.name"
            autocomplete="user-name"
            class="default-input"
            required
            type="text"
          >
        </div>

        <div
          v-if="hasPermission('read', 'pricing')"
          class="default-field mt-6"
        >
          <label
            class="default-label"
            for="pricing_id"
          >
            Kelas Harga
          </label>
          <InputDropdown
            v-model="params.pricingId"
            class="default-input"
            :options="pricings"
          />
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
            @click.prevent="submit"
          >
            <Loading v-if="saveLoading" />
            Simpan
          </button>
        </div>
      </div>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
