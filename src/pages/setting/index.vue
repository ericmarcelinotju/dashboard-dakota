<template>
  <DefaultCreateEdit :has-back="false">
    <template #form>
      <DefaultTabs
        :options="[
          { label: 'Hari Libur', value: 'holiday' },
        ]"
      >
        <template #holiday>
          <setting-holiday />
        </template>
      </DefaultTabs>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
