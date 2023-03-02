<template>
  <DefaultCreateEdit>
    <template #form>
      <DefaultTabs
        :options="tabOptions"
      >
        <template #product>
          <product-form
            :loading="loading"
            :product="params"
          />
        </template>
        <template #theater>
          <theater-form
            :loading="loading"
            :product="params"
          />
        </template>
      </DefaultTabs>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
