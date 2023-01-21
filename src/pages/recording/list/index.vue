<template>
  <DefaultPage :title="$t('app.fields.recording')">
    <template #action>
      <button
        v-if="hasPermission('POST')"
        class="info-button mr-4"
        type="button"
        @click="handleCreate"
      >
        <PlusIcon class="w-4 h-4 mr-1" />
        {{ $t("app.components.customSearch.create") }}
      </button>
      <button>
        <CogIcon
          class="w-5 h-5 text-gray-500"
          @click="() => (visibleFieldConfigModal = true)"
        />
      </button>
    </template>
    <template #search>
      <RecordingSearch @search="handleSearch" />
    </template>
    <template #table>
      <DefaultTable
        :fields="fields"
        :has-delete="hasPermission('DELETE')"
        :has-edit="hasPermission('PUT')"
        :items="items"
        :loading="loading"
        :total="itemsTotal"
        @delete="handleDelete"
        @edit="handleEdit"
        @search="handleSearch"
      >
        <template #branch="{ item }">
          <span>{{ item.branch && item.branch.name }}</span>
        </template>
        <template #call_from_number="{ item }">
          <span>
            {{ item.call_from?.username }}
            &lt;{{ item.call_from_number }}&gt;
          </span>
        </template>
        <template #call_to_number="{ item }">
          <span>
            {{ item.call_to?.username }}
            &lt;{{ item.call_to_number }}&gt;
          </span>
        </template>
        <template #status="{ item }">
          <span class="info-tag">
            {{ item.status }}
          </span>
        </template>
        <template #type="{ item }">
          <span class="success-tag">
            {{ item.type }}
          </span>
        </template>
        <template #created_by="{ item }">
          <span class="default-tag">
            {{ item.created_by ? item.created_by.username : "system" }}
          </span>
        </template>
        <template #is_legacy="{ item }">
          <span :class="item.is_legacy ? 'warning-tag' : 'info-tag'">
            {{ item.is_legacy ? $t("global.yes") : $t("global.no") }}
          </span>
        </template>
        <template #error="{ item }">
          <PopoverInfo
            v-if="item.error"
            class-name="text-primary-red"
            :info="item.error"
          />
        </template>
        <template #options="{ item }">
          <div class="flex justify-center gap-4">
            <a
              v-if="hasPermission('POST', 'PLAY_RECORDING')"
              class="play"
              :class="{ 'pointer-events-none': !item.recording || item.error }"
              @click="handlePlay(item)"
            >
              <PlayIcon
                class="icon h-6 w-6"
                :class="{
                  'text-gray-500': !item.recording || item.error,
                  'cursor-wait': loadingDownload
                }"
              />
            </a>
            <a
              v-if="hasPermission('POST', 'DOWNLOAD_RECORDING')"
              class="download"
              :class="{ 'pointer-events-none': !item.recording || item.error }"
              @click="handleDownload(item)"
            >
              <DownloadIcon
                class="icon h-6 w-6"
                :class="{
                  'text-gray-500': !item.recording || item.error,
                  'cursor-wait': loadingDownload
                }"
              />
            </a>
          </div>
          <!-- <div
            v-else
            class="flex gap-4"
          >
            <a class="play pointer-events-none">
              <PlayIcon class="h-6 w-6 text-gray-500" />
            </a>
            <a class="download pointer-events-none">
              <DownloadIcon class="h-6 w-6 text-gray-500" />
            </a>
          </div> -->
        </template>
      </DefaultTable>
    </template>
    <template #dialog>
      <DefaultModal
        v-model="visibleDeleteConfirmationModal"
        :loading="loadingDelete"
        type="danger"
        @confirm="confirmDelete"
      />
      <DefaultModal
        v-model="visiblePlayRecordingModal"
        description=""
        :has-cancel="false"
        :has-confirm="false"
        :has-icon="false"
        title="Play Recording"
        type="info"
      >
        <div class="mt-6 font-bold">
          <div class="mr-4 float-left h-full w-1 bg-primary-blue">
&nbsp;
          </div>
          Recording Information
        </div>
        <div class="grid grid-cols-12 mt-6 text-sm">
          <span class="col-span-2">Call From</span>
          <span class="col-span-1">:</span>
          <span class="col-span-2">
            {{ playRecordingItem.call_from_number }}
          </span>
          <span class="col-span-2" />
          <span class="col-span-2">Call To</span>
          <span class="col-span-1">:</span>
          <span class="col-span-2">{{ playRecordingItem.call_to_number }}</span>
          <span class="col-span-12 mt-4" />
          <span class="col-span-2">Duration</span>
          <span class="col-span-1">:</span>
          <span class="col-span-2">{{ playRecordingItem.talk_duration }}</span>
        </div>
        <div class="mt-6 font-bold">
          <div class="mr-4 float-left h-full w-1 bg-primary-blue">
&nbsp;
          </div>
          Play on Web
        </div>
        <div class="mt-6">
          <audio
            controls
            :src="playRecordingItem.recording_file"
          />
        </div>
      </DefaultModal>
      <DefaultModal
        v-model="visibleFieldConfigModal"
        description="Please choose the item shown in the list:"
        :has-cancel="false"
        :has-icon="false"
        title="Edit List Options"
        type="info"
        @confirm="onConfirmFieldConfig"
      >
        <div class="mt-6 grid grid-cols-3 gap-4">
          <div
            v-for="field in fields.filter((field) => field.editable !== false)"
            :key="field"
            class="flex field"
          >
            <input
              :id="field.value"
              ref="visibleCheckboxRefs"
              :checked="!field.hidden"
              class="default-checkbox"
              type="checkbox"
            >
            <label
              class="default-label"
              :for="field.value"
            >
              {{ field.name }}
            </label>
          </div>
        </div>
        <template #action>
          <button
            class="default-button mr-6"
            type="button"
            @click="setDefaultFields"
          >
            {{ $t("app.set_default") }}
          </button>
        </template>
      </DefaultModal>
    </template>
  </DefaultPage>
</template>

<script src="./script.js"></script>
