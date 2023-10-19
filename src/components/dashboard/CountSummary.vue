<template>
  <DefaultBoard :title="title">
    <v-row no-gutters>
      <v-col cols="12" class="d-flex align-center mb-2">
        <v-chip label color="#F3F4F5" small>SUM</v-chip>
        <slot name="label">
          <span class="ml-2">{{ metric?.label }}</span>
        </slot>
      </v-col>

      <v-col cols="12" class="mb-2">
        <slot name="count">
          <p class="mb-0 font-weight-black text-h4">{{ sumCount | commaFormat }}</p>
        </slot>
      </v-col>

      <v-col cols="12">
        <slot name="net">
          <p class="mb-0" :class="netCount >= 0 ? 'red--text' : 'blue--text'">
            <v-icon :color="netCount >= 0 ? 'red' : 'blue'">
              {{ netCount >= 0 ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
            </v-icon>
            {{ netCount | commaFormat }}
          </p>
        </slot>
      </v-col>
    </v-row>
  </DefaultBoard>
</template>

<script>
import { mapGetters } from 'vuex'
import DefaultBoard from './template/DefaultBoard.vue'

export default {
  props: {
    summaryKey: {
      required: true,
      type: String,
    },
    title: {
      type: String,
      default: null,
    },
  },
  components: {
    DefaultBoard,
  },
  computed: {
    ...mapGetters('dashboard', {
      dailyReport: 'getDailyReport',
    }),
    metric() {
      const metric = this.dailyReport?.metric || []
      return metric.filter((ec) => ec.key === this.summaryKey)[0]
    },
    sumCount() {
      const metric = this.metric?.data || []
      const sum = metric.reduce((prev, cur) => {
        return (prev += cur)
      }, 0)

      return sum
    },
    netCount() {
      const metric = this.metric?.data || []
      if (metric.length < 1) {
        return 0
      }
      const prevAndToday = metric.slice(-2)
      const prev = prevAndToday.length < 2 ? 0 : prevAndToday[0]
      const today = prevAndToday[1]
      return today - prev
    },
  },
}
</script>
