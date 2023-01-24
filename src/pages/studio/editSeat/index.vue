<template>
  <DefaultCreateEdit>
    <template #form>
      <div class="p-6 overflow-y-auto min-h-[92%] mb-14">
        <div class="default-field mt-6">
          <label class="default-label" for="seats">Kursi</label>
          <div class="flex mt-4" :key="i" v-for="i in 12">
            <div :key="j" v-for="j in 12">
              <input class="default-checkbox" type="checkbox" value="true" />
            </div>
          </div>
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
