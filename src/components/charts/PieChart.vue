<template>
  <div>
    <PieChart
      :data="data"
      :options="options"
      :width="width"
      :height="height"
      :plugins="chartPlugins"
    />
  </div>
</template>

<script>
import { Pie as PieChart } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

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
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    PieChart,
  },
  data() {
    return {
      chartPlugins: [],
    }
  },
  created() {
    this.setPlugins()
  },
  methods: {
    setPlugins() {
      // https://codepen.io/BillDou/pen/oNoGBXb
      const pieLabelsLine = {
        id: 'pieLabelsLine',
        afterDraw(chart) {
          const {
            ctx,
            chartArea: { width, height },
          } = chart

          const cx = chart._metasets[0].data[0].x
          const cy = chart._metasets[0].data[0].y

          const sum = chart.data.datasets[0].data.reduce((a, b) => a + b, 0)

          chart.data.datasets.forEach((dataset, i) => {
            chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
              const { x: a, y: b } = datapoint.tooltipPosition()

              const x = 2 * a - cx
              const y = 2 * b - cy

              // draw line
              const halfwidth = width / 2
              const halfheight = height / 2
              const xLine = x >= halfwidth ? x + 20 : x - 20
              const yLine = y >= halfheight ? y + 20 : y - 20

              const extraLine = x >= halfwidth ? 10 : -10

              ctx.beginPath()
              ctx.moveTo(x, y)
              ctx.arc(x, y, 2, 0, 2 * Math.PI, true)
              ctx.fill()
              ctx.moveTo(x, y)
              ctx.lineTo(xLine, yLine)
              ctx.lineTo(xLine + extraLine, yLine)
              // ctx.strokeStyle = dataset.backgroundColor[index];
              ctx.strokeStyle = 'black'
              ctx.stroke()

              // text
              const textWidth = ctx.measureText(chart.data.labels[index]).width
              ctx.font = '12px Arial'
              // control the position
              const textXPosition = x >= halfwidth ? 'left' : 'right'
              const plusFivePx = x >= halfwidth ? 5 : -5
              ctx.textAlign = textXPosition
              ctx.textBaseline = 'middle'
              // ctx.fillStyle = dataset.backgroundColor[index];
              ctx.fillStyle = 'black'

              ctx.fillText(chart.data.labels[index], xLine + extraLine + plusFivePx, yLine)
            })
          })
        },
      }

      // const legendMargin = {
      //   beforeInit: (chart) => {
      //     // Get reference to the original fit function
      //     const originalFit = chart.legend.fit

      //     // Override the fit function
      //     chart.legend.fit = function fit() {
      //       // Call original function and bind scope in order to use `this` correctly inside it
      //       originalFit.bind(chart.legend)()
      //       // Change the height as suggested in another answers
      //       chart.legend.bottom = chart.legend.bottom - 30
      //     }
      //   },
      // }

      this.chartPlugins = [...this.plugins, pieLabelsLine]
    },
  },
}
</script>
