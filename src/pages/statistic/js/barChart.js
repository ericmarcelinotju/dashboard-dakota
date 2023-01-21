import { computed, defineComponent, h } from 'vue'

import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    labels: {
      type: Array,
      default: () => ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']
    },
    data: {
      type: Array,
      default: () => [[0, 0], [92, 2]]
    },
    dataLabels: {
      type: Array,
      default: () => ['VueJs', 'EmberJs']
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
    const chartData = computed(() => {
      const backgroundColors = ['#4766CD', '#CD4766']
      const datasets = props.data.map((data, i) => ({
        label: props.dataLabels[i],
        backgroundColor: backgroundColors[i],
        data: data
      }))
      return {
        labels: props.labels,
        datasets: datasets
      }
    })

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return () =>
      h(Bar, {
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
