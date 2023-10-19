<template>
  <div v-if="chartData !== null">
    <MixBarLine :data="chartData" :options="chartOptions" height="300" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Bar as MixBarLine } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
)

export default {
  components: {
    MixBarLine,
  },
  data() {
    return {
      selectedDate: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          bar: {
            backgroundColor: '#22C3AA',
          },
          line: {
            borderColor: '#22C3AA',
            pointBorderColor: '#22C3AA',
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 8,
            },
            gridLines: {
              display: false,
            },
          },
          page_view: {
            position: 'left',
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
              color: '#22C3AA',
              callback: (value, index, ticks) => {
                return value < 1 ? 0 : value / 1000 + 'k'
              },
            },
          },
          unique_view: {
            position: 'right',
          },
        },
      },
      chartData: null,
    }
  },
  computed: {
    ...mapGetters('dashboard', {
      dailyReport: 'getDailyReport',
    }),
  },
  watch: {
    dailyReport() {
      this.makeData()
    },
  },
  methods: {
    makeData() {
      if (!this.dailyReport) {
        return
      }
      const seg = this.dailyReport.segment[0]
      const thirtyDays = seg.data.slice(seg.data.length < 30 ? -seg.data.length : -30)

      const datasets = this.dailyReport.metric.map((metr) => {
        const dataset = {
          label: metr.label,
          data: metr.data.slice(-thirtyDays.length),
          yAxisID: metr.key,
        }

        if (metr.key === 'unique_view') {
          dataset.type = 'line'
          dataset.fill = false
        } else {
          dataset.type = 'bar'
          dataset.maxBarThickness = 15
        }

        return dataset
      })

      this.chartData = {
        labels: seg.data.slice(-thirtyDays.length),
        datasets,
      }
    },
  },
}
</script>
