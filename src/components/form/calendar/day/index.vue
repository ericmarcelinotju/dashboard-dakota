<template>
  <div class="calendar">
    <div class="time-block">
      <template
        v-for="i in totalHour"
        :key="i"
      >
        <div class="time">
          {{ toHour(getHour(i)) }}
        </div>
        <div
          v-if="i !== totalHour"
          class="time small"
        >
          {{ toHour(getHour(i), 30, 'hh:mm') }}
        </div>
      </template>
    </div>
    <div
      id="calendar-view"
      class="calendar-view"
    >
      <template
        v-for="i in totalHour"
        :key="i"
      >
        <div
          v-if="i !== totalHour"
          class="separator"
          :style="{ top: `${(i-1)*60}px` }"
          @click="onCalendarClick(getHour(i))"
        />
        <div
          v-if="i !== totalHour"
          class="separator small"
          :style="{ top: `${((i-1)*60) + 30}px` }"
          @click="onCalendarClick(getHour(i), 30)"
        />
      </template>
      <div
        v-for="(event, i) in modelValue"
        :key="event"
        class="event"
        :style="{
          top: `${((event.hour - minHour) * 60) + event.minute}px`,
          height: `${event.duration}px`,
        }"
      >
        <div class="highlight" />
        <div class="content">
          <div class="title">
            {{ event.title }}
          </div>
          <span class="detail">
            {{ event.detail }}
          </span>
        </div>
        <button
          class="w-12 text-gray-400 hover:text-gray-500 float-right"
          type="button"
          @click="onEventDelete(i)"
        >
          <TrashIcon class="w-6 h-6 m-auto" />
        </button>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" scoped>
.calendar {
  @apply flex;
}
.time-block {
  @apply w-32 px-4;
}

.time {
  @apply text-sm text-right h-[30px];
  &.small {
    @apply text-xs text-gray-400 pt-[3px];
  }
}

.calendar-view {
  @apply relative w-full mt-[10px] mb-[15px] bg-gray-300 overflow-hidden;
}

.separator {
  @apply absolute w-full h-px bg-gray-700 cursor-pointer hover:h-[5px];

  &:after {
    @apply absolute content-[''] w-full h-[30px];
  }

  &.small {
    @apply bg-gray-400;
  }
}

/* Events related */
.event {
  @apply flex flex-1 absolute w-full bg-gray-50 text-left;

  .highlight {
    @apply w-2 bg-primary-blue;
  }

  .content {
    @apply flex-1 p-2;
    .title {
      @apply font-semibold text-sm text-primary-blue;
    }

    .detail {
      @apply text-xs;
    }
  }
}
</style>
