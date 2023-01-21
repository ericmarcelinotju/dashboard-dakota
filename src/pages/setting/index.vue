<template>
  <DefaultCreateEdit :has-back="false" :title="$t('app.fields.setting')">
    <template #form>
      <div class="px-2 overflow-y-auto min-h-[92%] mb-14">
        <DefaultTabs
          :options="[
            { label: 'Scheduler', value: 'scheduler' },
            { label: 'Storage', value: 'storage' },
            { label: 'Email', value: 'email' },
          ]"
        >
          <template #scheduler>
            <div class="grid grid-cols-12 gap-6 px-4 py-5">
              <div class="col-span-6 default-field">
                <label class="default-label">Backup Time</label>
                <VueDatepicker
                  id="first_backup_time"
                  v-model="firstBackupTime"
                  auto-apply
                  class="default-input"
                  :clearable="false"
                  time-picker
                  vertical
                />
              </div>

              <div class="col-span-6 default-field">
                <VueDatepicker
                  id="second_backup_time"
                  v-model="secondBackupTime"
                  auto-apply
                  class="default-input"
                  :clearable="false"
                  time-picker
                  vertical
                />
              </div>
            </div>
          </template>

          <template #storage>
            <div class="grid grid-cols-12 gap-6 px-4 py-5">
              <div class="col-span-12 text-primary-blue text-xl font-bold">
                Archive
                <hr class="mt-2 border-primary-blue" />
              </div>
              <div class="col-span-6 default-field">
                <label class="default-label" for="archive_sftp_host">
                  {{ $t("app.fields.sftp") }}
                  {{ $t("app.fields.host") }}
                </label>
                <input
                  id="archive_sftp_host"
                  v-model="params.archive_sftp_host"
                  class="default-input"
                  required
                  type="text"
                />
              </div>

              <div class="col-span-6 mt-2 default-field">
                <label class="default-label" for="archive_sftp_port">
                  {{ $t("app.fields.sftp") }}
                  {{ $t("app.fields.port") }}
                </label>
                <input
                  id="archive_sftp_port"
                  v-model="params.archive_sftp_port"
                  class="default-input"
                  required
                  type="number"
                />
              </div>
              <div class="col-span-6 default-field">
                <label class="default-label" for="archive_sftp_username">
                  {{ $t("app.fields.sftp") }}
                  {{ $t("app.fields.username") }}
                </label>
                <input
                  id="archive_sftp_username"
                  v-model="params.archive_sftp_username"
                  class="default-input"
                  required
                  type="text"
                />
              </div>

              <div class="col-span-6 default-field">
                <label class="default-label" for="archive_sftp_password">
                  {{ $t("app.fields.sftp") }}
                  {{ $t("app.fields.password") }}
                </label>
                <input
                  id="archive_sftp_password"
                  v-model="params.archive_sftp_password"
                  class="default-input"
                  required
                  type="password"
                />
              </div>

              <div class="col-span-12 default-field">
                <label class="default-label" for="archive_storage_folder">
                  {{ $t("app.fields.recording") }}
                  {{ $t("app.fields.folder") }}
                </label>
                <input
                  id="archive_storage_folder"
                  v-model="params.archive_storage_folder"
                  class="default-input"
                  required
                  type="text"
                />
              </div>

              <div class="col-span-12 text-primary-blue text-xl font-bold">
                Legacy
                <hr class="mt-2 border-primary-blue" />
              </div>
              <div class="col-span-6 mt-2 default-field">
                <label class="default-label" for="legacy_sftp_host">
                  {{ $t("app.fields.sftp") }}
                  {{ $t("app.fields.host") }}
                </label>
                <input
                  id="legacy_sftp_host"
                  v-model="params.legacy_sftp_host"
                  class="default-input"
                  required
                  type="text"
                />
              </div>

              <div class="col-span-6 mt-2 default-field">
                <label class="default-label" for="legacy_sftp_port">
                  {{ $t("app.fields.sftp") }}
                  {{ $t("app.fields.port") }}
                </label>
                <input
                  id="legacy_sftp_port"
                  v-model="params.legacy_sftp_port"
                  class="default-input"
                  required
                  type="number"
                />
              </div>
              <div class="col-span-6 default-field">
                <label class="default-label" for="legacy_sftp_username">
                  {{ $t("app.fields.sftp") }}
                  {{ $t("app.fields.username") }}
                </label>
                <input
                  id="legacy_sftp_username"
                  v-model="params.legacy_sftp_username"
                  class="default-input"
                  required
                  type="text"
                />
              </div>

              <div class="col-span-6 default-field">
                <label class="default-label" for="legacy_sftp_password">
                  {{ $t("app.fields.sftp") }}
                  {{ $t("app.fields.password") }}
                </label>
                <input
                  id="legacy_sftp_password"
                  v-model="params.legacy_sftp_password"
                  class="default-input"
                  required
                  type="password"
                />
              </div>

              <div class="col-span-12 default-field">
                <label class="default-label" for="legacy_storage_folder">
                  {{ $t("app.fields.backup") }}
                  {{ $t("app.fields.folder") }}
                </label>
                <input
                  id="legacy_storage_folder"
                  v-model="params.legacy_storage_folder"
                  class="default-input"
                  required
                  type="text"
                />
              </div>
            </div>
          </template>

          <template #email>
            <div class="grid grid-cols-12 gap-6 px-4 py-5">
              <div class="col-span-6 mt-2 default-field">
                <label class="default-label" for="smtp_host">
                  {{ $t("app.fields.smtp") }}
                  {{ $t("app.fields.host") }}
                </label>
                <input
                  id="smtp_host"
                  v-model="params.smtp_host"
                  class="default-input"
                  required
                  type="text"
                />
              </div>

              <div class="col-span-6 mt-2 default-field">
                <label class="default-label" for="smtp_port">
                  {{ $t("app.fields.smtp") }}
                  {{ $t("app.fields.port") }}
                </label>
                <input
                  id="smtp_port"
                  v-model="params.smtp_port"
                  class="default-input"
                  required
                  type="number"
                />
              </div>
              <div class="col-span-12 default-field">
                <input
                  v-model="params.smtp_is_use_auth"
                  id="smtp_is_use_auth"
                  class="default-checkbox"
                  type="checkbox"
                />
                <label class="default-label" for="smtp_is_use_auth">
                  Require authentication?
                </label>
              </div>
              <template v-if="params.smtp_is_use_auth">
                <div class="col-span-6 default-field">
                  <label class="default-label" for="smtp_email">
                    {{ $t("app.fields.smtp") }}
                    {{ $t("app.fields.email") }}
                  </label>
                  <input
                    id="smtp_email"
                    v-model="params.smtp_email"
                    class="default-input"
                    required
                    type="text"
                  />
                </div>

                <div class="col-span-6 default-field">
                  <label class="default-label" for="smtp_password">
                    {{ $t("app.fields.smtp") }}
                    {{ $t("app.fields.password") }}
                  </label>
                  <input
                    id="smtp_password"
                    v-model="params.smtp_password"
                    class="default-input"
                    required
                    type="password"
                  />
                </div>
              </template>
              <div class="col-span-6 default-field">
                <input
                  id="test_email"
                  v-model="testEmailParams.email"
                  class="default-input mr-6"
                  placeholder="Email"
                  required
                  type="text"
                />
                <button
                  class="info-button"
                  :disabled="testEmailLoading"
                  @click.prevent="testEmail"
                  type="submit"
                >
                  <Loading v-if="testEmailLoading" />
                  Test
                </button>
              </div>
            </div>
          </template>
        </DefaultTabs>
        <div class="create-edit-submit-container">
          <button
            class="warning-button mr-4"
            type="cancel"
            @click.prevent="reset"
          >
            {{ $t("app.createEdit.cancel") }}
          </button>
          <button
            class="success-button"
            :disabled="saveLoading"
            type="submit"
            @click.prevent="submit"
          >
            <Loading v-if="saveLoading" />
            {{ $t("app.createEdit.save") }}
          </button>
        </div>
      </div>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
