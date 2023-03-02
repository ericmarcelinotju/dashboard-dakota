<template>
  <div class="pb-6">
    <div class="m-6">
      <label class="font-bold">Aktif di Teater</label>

      <div class="flex flex-row items-center my-4">
        <label
          class="default-label w-32"
          for="theater_id"
        >
          Tambah Teater
        </label>
        <InputDropdown
          v-model="params.theaterId"
          class="default-input"
          :options="theaterOptions"
        />

        <button
          class="danger-button ml-4"
          type="add"
          @click.prevent="addTheater"
        >
          Tambah
        </button>
      </div>

      <DefaultTable
        class="mx-6"
        :fields="fields"
        :has-edit="false"
        :has-pagination="false"
        :items="items"
        :loading="loading"
        :total="itemsTotal"
        @delete="removeTheater"
      >
        <template #theater="{ item }">
          <span>{{ item.theater.name }}</span>
        </template>
      </DefaultTable>

      <button
        class="danger-button w-full mt-4"
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

<script src="./script.js"></script>
