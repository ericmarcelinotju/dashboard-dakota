import { computed, defineComponent, h } from 'vue'

import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
ChartJS.defaults.font.size = 14

export default defineComponent({
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    labels: {
      type: Array,
      default: () => ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']
    },
    data: {
      type: Array,
      default: () => [40, 20, 80, 10]
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const chartData = computed(() =>
      ({
        labels: props.labels,
        datasets: [
          {
            backgroundColor: ['#CD4766', '#4766CD', '#65CC46', '#47A9CD'],
            data: props.data
          }
        ]
      })
    )
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            padding: 18,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        }
      }
    }

    return () =>
      h(Pie, {
        chartData: chartData.value,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
  }
})
