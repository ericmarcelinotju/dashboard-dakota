<template>
  <DefaultCreateEdit>
    <template #form>
      <DefaultTabs
        :options="tabOptions"
      >
        <template #movie>
          <movie-form
            :loading="loading"
            :movie="params"
          />
        </template>
        <template #theater>
          <theater-form
            :loading="loading"
            :movie="params"
          />
        </template>
      </DefaultTabs>
    </template>
  </DefaultCreateEdit>
</template>

<script src="./script.js"></script>
