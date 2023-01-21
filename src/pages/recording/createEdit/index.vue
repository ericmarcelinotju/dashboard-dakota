<template>
  <DefaultCreateEdit>
    <template #form>
      <form
        class="p-6 overflow-y-auto min-h-[92%] mb-14"
        @submit.prevent="submit"
      >
        <div class="default-field mt-4">
          <label class="default-label" for="call_id">
            {{ $t("app.fields.call_id") }}<sup>*</sup>
          </label>
          <input
            id="call_id"
            v-model="params.call_id"
            class="default-input"
            required
            type="text"
          />
        </div>

        <div class="default-field mt-6">
          <label class="default-label" for="serial_number">
            {{ $t("app.fields.serial_number") }}
          </label>
          <input
            id="serial_number"
            v-model="params.serial_number"
            class="default-input"
            type="text"
          />
        </div>

        <div class="default-field mt-6">
          <label class="default-label" for="branch">
            {{ $t("app.fields.branch") }}<sup>*</sup>
          </label>
          <InputDropdown
            id="branch"
            v-model="params.branch_id"
            class="default-input"
            name="branch"
            :options="branches"
            @input="onBranchChange"
          />
        </div>

        <div
          v-if="params.branch_id"
          class="grid grid-cols-12 gap-x-24 gap-y-4 mt-6"
        >
          <datalist id="extensions">
            <option
              v-for="extension in extensions"
              :key="extension.id"
              :value="extension.number"
            />
          </datalist>
          <div class="default-field col-span-6">
            <label class="default-label" for="call_from">
              {{ $t("app.fields.call_from") }}<sup>*</sup>
            </label>
            <input
              id="call_from"
              v-model="params.call_from_number"
              class="default-input"
              list="extensions"
              required
              type="text"
            />
          </div>
          <div class="default-field col-span-6">
            <label class="default-label" for="call_to">
              {{ $t("app.fields.call_to") }}<sup>*</sup>
            </label>
            <input
              id="call_to"
              v-model="params.call_to_number"
              class="default-input"
              list="extensions"
              required
              type="text"
            />
          </div>

          <datalist id="trunks">
            <option
              v-for="trunk in trunks"
              :key="trunk.value"
              :value="trunk.value"
            />
          </datalist>
          <div class="default-field col-span-6">
            <label class="default-label" for="src_trunk">
              {{ $t("app.fields.src_trunk_name") }}
            </label>
            <input
              id="src_trunk"
              v-model="params.src_trunk_name"
              class="default-input"
              list="trunks"
              type="text"
            />
          </div>

          <div class="default-field col-span-6">
            <label class="default-label" for="dst_trunk">
              {{ $t("app.fields.dst_trunk_name") }}
            </label>
            <input
              id="dst_trunk"
              v-model="params.dst_trunk_name"
              class="default-input"
              list="trunks"
              type="text"
            />
          </div>
        </div>

        <div class="default-field mt-6">
          <label class="default-label" for="status">
            {{ $t("app.fields.status") }}
          </label>
          <InputDropdown
            id="status"
            v-model="params.status"
            class="default-input"
            label-key="label"
            name="status"
            :options="statusOptions"
            value-key="value"
          />
        </div>
        <div class="default-field mt-6">
          <label class="default-label" for="type">
            {{ $t("app.fields.type") }}
          </label>
          <InputDropdown
            id="type"
            v-model="params.type"
            class="default-input"
            label-key="label"
            name="type"
            :options="typeOptions"
            value-key="value"
          />
        </div>

        <div class="default-field mt-6">
          <label class="default-label" for="pin_code">
            {{ $t("app.fields.pin_code") }}
          </label>
          <input
            id="pin_code"
            v-model="params.pin_code"
            class="default-input"
            type="text"
          />
        </div>

        <div class="default-field mt-6">
          <label class="default-label" for="did_number">
            {{ $t("app.fields.did_number") }}
          </label>
          <input
            id="did_number"
            v-model="params.did_number"
            class="default-input"
            type="text"
          />
        </div>

        <div class="grid grid-cols-12 gap-x-24 gap-y-4 mt-6">
          <div class="default-field col-span-6">
            <label class="default-label" for="start_time">
              {{ $t("app.fields.start_time") }}
            </label>
            <VueDatepicker
              id="start_time"
              v-model="startTime"
              auto-apply
              class="default-input"
              vertical
            />
          </div>
          <div class="default-field col-span-6">
            <label class="default-label" for="call_duration">
              {{ $t("app.fields.call_duration") }}
            </label>
            <input
              id="call_duration"
              v-model="params.call_duration"
              class="default-input"
              type="number"
            />
          </div>
        </div>
        <div class="default-field mt-6">
          <label class="default-label" for="recording">
            {{ $t("app.fields.recording") }}
          </label>
          <InputAudio
            id="recording"
            v-model="params.recording"
            class="default-input"
            @input="onUploadRecording"
          />
        </div>

        <div class="create-edit-submit-container">
          <button
            class="warning-button mr-4"
            type="cancel"
            @click.prevent="reset"
          >
            {{ $t("app.createEdit.cancel") }}
          </button>
          <button class="info-button" :disabled="saveLoading" type="submit">
            <Loading v-if="saveLoading" />
            {{ $t("app.createEdit.save") }}
          </button>
        </div>
      </form>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
