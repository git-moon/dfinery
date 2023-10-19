<template>
  <div id="dashboard">
    <ResizableBox :elements="drags" draggable>
      <template #default="props">
        <Resizable
          v-for="drag in props.items"
          :key="drag.key"
          class="px-2 py-3"
          :style="{ width: `${(drag.cols / 12) * 100}%` }"
        >
          <component :is="drag.component" v-bind="drag.bind" />
        </Resizable>
      </template>
    </ResizableBox>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import ResizableBox from './resizable/ResizableBox.vue'
import Resizable from './resizable/Resizable.vue'
import CountSummary from './dashboard/CountSummary.vue'
import DAU from './dashboard/DAU.vue'
import TopReferralPie from './dashboard/TopReferralPie.vue'
import CountIp from './dashboard/CountIp.vue'

export default {
  components: {
    ResizableBox,
    Resizable,
    CountSummary,
    DAU,
    TopReferralPie,
    CountIp,
  },
  data() {
    return {
      drags: [
        {
          key: 'uniqueView',
          cols: 6,
          component: 'CountSummary',
          bind: { summaryKey: 'unique_view', title: '접속유저' },
        },
        {
          key: 'pageView',
          cols: 6,
          component: 'CountSummary',
          bind: { summaryKey: 'page_view', title: '접속횟수' },
        },
        { key: 'dau', cols: 12, component: 'DAU', bind: { title: 'DAU' } },
        {
          key: 'topReferral',
          cols: 6,
          component: 'TopReferralPie',
          bind: { title: 'Top Referral' },
        },
        {
          key: 'countIp',
          cols: 6,
          component: 'CountIp',
          bind: { title: 'Top Referral' },
        },
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
