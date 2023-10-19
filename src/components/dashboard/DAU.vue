<template>
  <DefaultBoard :title="title">
    <v-row no-gutters>
      <v-col cols="12" class="mb-8 px-8">
        <DAULineChart />
      </v-col>

      <v-col cols="12">
        <DAUMixedChart />
      </v-col>
    </v-row>
  </DefaultBoard>
</template>

<script>
import DefaultBoard from './template/DefaultBoard.vue'
import DAULineChart from './dau/DAULineChart.vue'
import DAUMixedChart from './dau/DAUMixedChart.vue'

export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  components: {
    DefaultBoard,
    DAULineChart,
    DAUMixedChart,
  },
}
</script>
