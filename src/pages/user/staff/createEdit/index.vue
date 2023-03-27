<template>
  <DefaultCreateEdit>
    <template #form>
      <div class="h-[92%]">
        <DefaultTabs
          :options="[
            { label: 'Profil Pengguna', value: 'profile' },
            { label: 'Theater Kerja', value: 'workin' }
          ]"
        >
          <template #profile>
            <user-form
              :loading="loading"
              :user="params"
            />
          </template>
          <template #workin>
            <work-form
              :loading="loading"
              :user="params"
            />
          </template>
        </DefaultTabs>
      </div>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
