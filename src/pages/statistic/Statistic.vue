<template>
  <div class="px-4 lg:px-8">
    <div class="shadow overflow-hidden rounded-md bg-white p-6">
      <BarChart
        :data="queueChartData"
        :data-labels="['Ready', 'Rejected']"
        :labels="['Backup']"
      />
      <div class="flex justify-between mt-6">
        <button
          class="info-button mr-4"
          type="button"
          @click="onTriggerMeter"
        >
          Trigger Auto Backup
        </button>

        <button
          class="danger-button mr-4"
          type="button"
          @click="onPurgeMeter"
        >
          Purge Rejected
        </button>
      </div>
    </div>
  </div>
</template>

<script src="./js/statistic.js"></script>
