<template>
  <CustomDetail
    :data="data"
    :excluded-fields="[]"
    :loading="loading"
  >
    <div class="min-w-full">
      <div class="text-gray-900 border-b-2 border-green-500 pb-5">
        <h3 class="text-lg font-medium ml-5">
          User Details
        </h3>
      </div>
      <div class="grid grid-cols-12 gap-6 mt-4">
        <div class="col-span-12 sm:col-span-6">
          <label
            class="default-label pb-1 pl-2"
            for="username"
          >
            {{ $t('app.fields.username') }}
          </label>
          <h1 class="default-detail">
            {{ data.username }}
          </h1>
        </div>
        <div class="col-span-12 sm:col-span-6">
          <label
            class="default-label pb-1 pl-2"
            for="email"
          >
            {{ $t('app.fields.email') }}
          </label>
          <h1 class="default-detail">
            {{ data.email }}
          </h1>
        </div>
      </div>
      <div class="col-span-6 mt-6">
        <label
          class="default-label pb-1 pl-2"
          for="role_name"
        >
          {{ $t('app.fields.role') }}
        </label>
        <h1 class="default-detail">
          <a
            v-if="hasPermission('GET', 'ROLE')"
            class="inline-flex items-center text-sky-700 hover:text-sky-900 cursor-pointer mr-5"
            @click="handleViewRole(data.role_id)"
          >
            {{ data.role_name }}
          </a>
          <span v-else>{{ data.role_name }}</span>
        </h1>
      </div>
      <div class="col-span-6 mt-6">
        <label
          class="default-label pb-1 pl-2"
          for="role_name"
        >
          {{ $t('app.fields.management') }}
        </label>
        <h1 class="default-detail">
          <a
            v-if="hasPermission('GET', 'MANAGEMENT')"
            class="inline-flex items-center text-sky-700 hover:text-sky-900 cursor-pointer mr-5"
            @click="handleViewManagement(data.management_id)"
          >
            {{ data.management_name }}
          </a>
          <span v-else>{{ data.management_name }}</span>
        </h1>
      </div>
    </div>
  </CustomDetail>
</template>

<script src="./script.js"></script>
