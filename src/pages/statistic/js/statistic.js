import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { queue as getQueueStat } from '@/api/stat.js'
// import { triggerBilling, purgeRejected as purgeBillingQueue } from '@/api/billing.js'
// import { triggerMeter, purgeRejected as purgeMeterQueue } from '@/api/meter.js'
import BarChart from './barChart'

export default defineComponent({
  components: { BarChart },
  setup () {
    const loading = ref(false)
    const queueChartData = ref([])

    const getStat = () => {
      loading.value = true
      getQueueStat()
        .then(res => {
          const queueStat = res.data
          queueChartData.value[0] = [queueStat.backup.ready]
          queueChartData.value[1] = [queueStat.backup.rejected]
          loading.value = false
        }, () => {
          loading.value = false
        })
    }

    let interval

    onMounted(() => {
      getStat()
      interval = setInterval(getStat, 5000)
    })

    onUnmounted(() => {
      clearInterval(interval)
    })

    const onTriggerMeter = () => {
      // triggerMeter(() => {
      //   getStat()
      // })
    }

    const onTriggerBilling = () => {
      // triggerBilling(() => {
      //   getStat()
      // })
    }

    const onPurgeMeter = () => {
      // purgeMeterQueue(() => {
      //   getStat()
      // })
    }

    const onPurgeBilling = () => {
      // purgeBillingQueue(() => {
      //   getStat()
      // })
    }

    return {
      queueChartData,
      onTriggerMeter,
      onTriggerBilling,
      onPurgeMeter,
      onPurgeBilling
    }
  }
})
