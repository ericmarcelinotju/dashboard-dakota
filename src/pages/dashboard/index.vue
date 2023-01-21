<template>
  <div class="col-span-9 px-6 mt-6 mr-6">
    <div class="grid grid-cols-12 gap-12">
      <div class="md:col-span-6 col-span-12 bg-white shadow">
        <div class="stat-label">
          {{ totalBranches }}
        </div>
        <hr />
        <div class="flex justify-between items-center p-4">
          <span class="font-bold">
            {{ $t("app.fields.branch") }}
          </span>
        </div>
      </div>
      <div class="md:col-span-6 col-span-12 bg-white shadow">
        <div class="stat-label">
          {{ totalExtensions }}
        </div>
        <hr />
        <div class="flex justify-between items-center p-4">
          <span class="font-bold">
            {{ $t("app.fields.extension") }}
          </span>
        </div>
      </div>
      <div class="md:col-span-6 col-span-12 bg-white shadow">
        <div class="stat-label">
          {{ totalRecordings }}
        </div>
        <hr />
        <div class="flex justify-between items-center p-4">
          <span class="font-bold">
            {{ $t("app.fields.recording") }}
          </span>
        </div>
      </div>
      <div class="md:col-span-6 col-span-12 bg-white shadow">
        <div class="stat-label">
          {{ totalLoggedInUsers }}
        </div>
        <hr />
        <div class="flex justify-between items-center p-4">
          <span class="font-bold"> Logged In Users </span>
        </div>
      </div>
      <div v-if="hasPermission('BRANCH')" class="col-span-12 bg-white">
        <div class="stat-label">Branches</div>
        <div class="flex ml-4 mt-1">
          <InputSwitch v-model="branchParams.is_online" />
          <label class="default-label ml-2" for="module">
            {{ branchParams.is_online ? $t("app.online") : $t("app.offline") }}
          </label>
        </div>
        <DefaultTable
          :fields="branchFields"
          :has-delete="false"
          :has-edit="false"
          :has-pagination="false"
          is-clickable
          :items="branches"
          :loading="branchLoading"
          :total="totalBranches"
          @row-click="onBranchClick"
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
        </DefaultTable>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
.stat-label {
  @apply relative left-3 bottom-3 w-full p-3 shadow-xl bg-primary-blue text-lg text-white font-bold;
}
</style>
