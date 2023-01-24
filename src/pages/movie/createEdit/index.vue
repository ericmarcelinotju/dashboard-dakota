<template>
  <DefaultCreateEdit>
    <template #form>
      <form
        class="p-6 overflow-y-auto min-h-[92%] mb-14"
        @submit.prevent="submit"
      >
        <div class="default-field mt-4">
          <label
            class="default-label"
            for="number"
          >
            {{ $t("app.fields.number") }}<sup>*</sup>
          </label>
          <input
            id="number"
            v-model="params.number"
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
            {{ $t("app.fields.name") }}<sup>*</sup>
          </label>
          <input
            id="name"
            v-model="params.name"
            class="default-input"
            required
            type="text"
          >
        </div>

        <template v-if="params.type === 'yeastar'">
          <div class="default-field mt-6">
            <label
              class="default-label"
              for="host"
            >
              {{ $t("app.fields.host") }}<sup>*</sup>
            </label>
            <input
              id="host"
              v-model="params.host"
              class="default-input"
              required
              type="text"
            >
          </div>

          <div class="grid grid-cols-12 gap-x-24 mt-6">
            <div class="default-field col-span-6">
              <label
                class="default-label"
                for="port"
              >
                {{ $t("app.fields.port") }}<sup>*</sup>
              </label>
              <input
                id="port"
                v-model="params.port"
                class="default-input"
                required
                type="text"
              >
            </div>
          </div>
          <div class="grid grid-cols-12 gap-x-24 mt-6">
            <div class="default-field col-span-6">
              <label
                class="default-label"
                for="username"
              >
                {{ $t("app.fields.username") }}<sup>*</sup>
              </label>
              <input
                id="username"
                v-model="params.username"
                class="default-input"
                required
                type="text"
              >
            </div>
            <div class="default-field col-span-6">
              <label
                class="default-label"
                for="password"
              >
                {{ $t("app.fields.password") }}<sup>*</sup>
              </label>
              <input
                id="password"
                v-model="params.password"
                class="default-input"
                :required="isUpdate"
                type="password"
              >
            </div>
          </div>
        </template>
        <template v-else>
          <div class="default-field mt-6">
            <label
              class="default-label"
              for="folder"
            >
              {{ $t("app.fields.folder") }}<sup>*</sup>
            </label>
            <input
              id="folder"
              v-model="params.folder"
              class="default-input"
              required
              type="text"
            >
          </div>
        </template>

        <div class="create-edit-submit-container">
          <button
            class="warning-button mr-4"
            type="cancel"
            @click.prevent="reset"
          >
            {{ $t("app.createEdit.cancel") }}
          </button>
          <button
            class="info-button"
            :disabled="saveLoading"
            type="submit"
          >
            <Loading v-if="saveLoading" />
            {{ $t("app.createEdit.save") }}
          </button>
        </div>
      </form>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
