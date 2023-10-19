<template>
  <div id="dashboard">
    <vuedraggable v-model="drags" class="resizable-box">
      <div
        v-for="drag in drags"
        :key="drag.key"
        class="px-2 py-3 resizable"
        :style="{ width: `${(drag.cols / 12) * 100}%` }"
      >
        <component :is="drag.component" v-bind="drag.bind" />
      </div>
    </vuedraggable>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import vuedraggable from 'vuedraggable'

import CountSummary from './dashboard/CountSummary.vue'
import DAU from './dashboard/DAU.vue'
import TopReferralPie from './dashboard/TopReferralPie.vue'
import CountIp from './dashboard/CountIp.vue'

export default {
  components: {
    vuedraggable,
    CountSummary,
    DAU,
    TopReferralPie,
    CountIp,
  },
  data() {
    return {
      drags: [
        {
          key: 1,
          cols: 6,
          component: 'CountSummary',
          bind: { summaryKey: 'unique_view', title: '접속유저' },
        },
        {
          key: 2,
          cols: 6,
          component: 'CountSummary',
          bind: { summaryKey: 'page_view', title: '접속횟수' },
        },
        { key: 3, cols: 12, component: 'DAU', bind: { title: 'DAU' } },
        { key: 4, cols: 6, component: 'TopReferralPie', bind: { title: 'Top Referral' } },
        { key: 5, cols: 6, component: 'CountIp', bind: { title: 'Top Referral' } },
      ],
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    ...mapActions('dashboard', ['getDailyReport', 'getReferral', 'getRegion']),
    fetch() {
      this.getDailyReport()
      this.getReferral()
      this.getRegion()
    },
  },
}
</script>

<style>
.resizable-box {
  display: flex;
  flex-wrap: wrap;
}

.resizable {
  min-width: 250px;
  min-height: 200px;
  height: 100%;

  resize: both;
  overflow: auto;
}
</style>
