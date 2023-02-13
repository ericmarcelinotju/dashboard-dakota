<template>
  <div class="workspace">
    <div class="h-full overflow-hidden flex flex-col bg-white shadow relative">
      <template v-if="title">
        <div class="my-2 ml-6 text-primary-blue font-bold">
          {{ title }}
        </div>
        <hr class="mb-2">
      </template>
      <slot name="form" />
    </div>
  </div>
</template>

<script src="./script.js"></script>
