<template>
  <div class="workspace">
    <div
      class="h-full overflow-hidden flex flex-col p-6 bg-white shadow relative"
    >
      <template v-if="title">
        <div class="mb-4 font-bold">
          {{ title }}
        </div>
      </template>
      <div
        v-if="$slots.search"
        class="mt-2"
      >
        <slot name="search" />
      </div>
      <div
        v-if="$slots.search && $slots.action"
        class="mt-4"
      />
      <div
        v-if="$slots.action"
        class="flex justify-between mb-4"
      >
        <div class="flex justify-center">
          <slot name="action" />
        </div>
      </div>
      <slot name="filter" />
      <slot name="form" />
      <slot name="table" />
      <slot name="dialog" />
      <slot />
    </div>
  </div>
</template>

<script src="./script.js"></script>
