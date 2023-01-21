<template>
  <DefaultPage :title="$t('app.fields.branch')">
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
    <template #table>
      <DefaultTable
        :fields="fields"
        :has-delete="hasPermission('DELETE')"
        :has-edit="hasPermission('PUT')"
        :items="items"
        :loading="loading"
        :total="itemsTotal"
        @delete="handleDelete"
        @detail="handleDetail"
        @edit="handleEdit"
        @search="handleSearch"
      >
        <template #status="{ item }">
          <span :class="item.is_online ? 'success-tag' : 'warning-tag'">
            {{ item.is_online ? $t("app.online") : $t("app.offline") }}
          </span>
        </template>
        <template #last_backup="{ item }">
          <span>
            {{ item.last_backup }}
          </span>
        </template>
        <template #web="{ item }">
          <a
            v-if="item.type === 'yeastar'"
            class="web"
            :href="`${item.host}:${item.port}`"
            target="_blank"
          >
            <GlobeIcon class="h-6 w-6 mr-1" />
          </a>
        </template>
        <template #sync="{ item }">
          <a class="sync" @click="handleSync(item)">
            <RefreshIcon
              class="h-6 w-6 mr-1"
              :class="{ 'animate-spin cursor-wait': loadingSync }"
            />
          </a>
        </template>
        <template #detail="{ item }">
          <DefaultTabs
            :options="[
              { label: 'Contacts', value: 'contact' },
              { label: 'Device', value: 'device' },
            ]"
          >
            <template #contact>
              <div class="grid grid-cols-2 gap-x-6">
                <div v-for="contact in item.contacts" :key="contact">
                  <div class="font-bold">
                    <div class="mr-4 float-left h-full w-1 bg-primary-blue">
                      &nbsp;
                    </div>
                    {{ contact.first_name }} {{ contact.last_name }}
                  </div>
                  <div>
                    <template v-for="(citem, key) in contact" :key="citem">
                      <div
                        v-if="!!citem && key !== 'id'"
                        class="grid grid-cols-2 mt-4 text-sm"
                      >
                        <span>{{ snakeToTitle(key) }}:</span>
                        <span>{{ citem }}</span>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </template>
            <template #device>
              <div class="font-bold">
                <div class="mr-4 float-left h-full w-1 bg-primary-blue">
                  &nbsp;
                </div>
                Device Informations
              </div>
              <div class="grid grid-cols-2 gap-x-6">
                <div
                  v-for="(ditem, key) in item.device"
                  :key="ditem"
                  class="grid grid-cols-2 mt-4 text-sm"
                >
                  <span>{{ snakeToTitle(key) }}:</span>
                  <span>{{ ditem }}</span>
                </div>
              </div>
            </template>
          </DefaultTabs>
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
            />
            <label class="default-label" :for="field.value">
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
