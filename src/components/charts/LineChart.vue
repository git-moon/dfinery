<template>
  <div>
    <LineChart :data="data" :options="options" :width="width" :height="height" />
  </div>
</template>

<script>
import { Line as LineChart } from 'vue-chartjs'

import { Chart as ChartJS, Filler, LinearScale, LineElement, PointElement } from 'chart.js'

ChartJS.register(Filler, LinearScale, LineElement, PointElement)

export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
  },
  components: {
    LineChart,
  },
}
</script>
