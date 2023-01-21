<template>
  <div class="workspace">
    <div class="h-full overflow-hidden flex flex-col bg-white shadow relative">
      <template v-if="title">
        <div class="my-2 ml-6 text-primary-blue font-bold">
          {{ title }}
        </div>
        <hr class="mb-2" />
      </template>
      <div v-if="hasBack" class="absolute top-0 right-0 mt-6 mr-6">
        <a class="text-primary-blue cursor-pointer" @click="back">
          <XIcon class="h-5 w-5" />
        </a>
      </div>
      <slot name="form" />
    </div>
  </div>
</template>

<script src="./script.js"></script>
