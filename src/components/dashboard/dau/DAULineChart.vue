<template>
  <div v-if="chartData !== null">
    <LineChart :data="chartData" :options="chartOptions" :height="50" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from '@/components/charts/LineChart.vue'

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            backgroundColor: '#AFBBD2',
            borderColor: '#AFBBD2',
          },
          point: {
            radius: 0,
          },
        },
        plugins: {
          chartAreaBorder: {
            borderWidth: 2,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
            ticks: {
              autoSkip: true,
              maxTicksLimit: 3,
            },
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
      const unique = this.dailyReport.metric.filter((metr) => metr.key === 'unique_view')[0]

      this.chartData = {
        labels: seg.data,
        datasets: [
          {
            type: 'line',
            label: unique.label,
            data: unique.data,
            fill: true,
          },
        ],
      }
    },
  },
}
</script>
