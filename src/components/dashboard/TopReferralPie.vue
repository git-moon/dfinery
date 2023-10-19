<template>
  <DefaultBoard :title="title">
    <v-row no-gutters>
      <v-col cols="12">
        <PieChart
          v-if="chartData !== null"
          :data="chartData"
          :options="chartOptions"
          :height="300"
        />
      </v-col>
    </v-row>
  </DefaultBoard>
</template>

<script>
import { mapGetters } from 'vuex'

import DefaultBoard from './template/DefaultBoard.vue'
import PieChart from '@/components/charts/PieChart.vue'

export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  components: {
    DefaultBoard,
    PieChart,
  },
  data() {
    return {
      selectedDate: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            paddingTop: 35,
          },
        },
      },
      chartData: null,
    }
  },
  computed: {
    ...mapGetters('dashboard', {
      referral: 'getReferral',
    }),
  },
  watch: {
    referral() {
      this.makeData()
    },
  },
  methods: {
    makeData() {
      if (!this.referral) {
        return
      }
      const refMap = new Map()
      const seg = this.referral.segment[0]
      const unique = this.referral.metric.filter((metr) => metr.key === 'unique_view')[0]

      // 각 리퍼럴 합계를 map으로 만든다.
      this.referral.rows.forEach((row) => {
        let ref = row[seg.idx]
        // www.는 제거한다
        ref = ref.replace(/^(www.)/, '')
        const metric = parseInt(row[unique.idx])

        const v = refMap.get(ref) ?? 0
        refMap.set(ref, v + metric)
      })

      // array로 만든 후 정렬
      const refArr = [...refMap]
      refArr.sort((a, b) => b[1] - a[1])

      const refData = { top: { ref: [], value: [] }, etc: 0 }
      refArr.reduce((prev, curr) => {
        if (prev.top.ref.length < 4) {
          prev.top.ref.push(curr[0])
          prev.top.value.push(curr[1])
        } else {
          prev.etc = prev.etc + curr[1]
        }

        return refData
      }, refData)

      this.chartData = {
        labels: [...refData.top.ref, 'etc'],
        datasets: [
          {
            type: 'pie',
            backgroundColor: ['#4EA397', '#22C3AA', '#7BD9A5', '#D06484', '#F58DB2'],
            data: [...refData.top.value, refData.etc],
          },
        ],
      }
    },
  },
}
</script>
