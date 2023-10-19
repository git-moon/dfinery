import DashboardUtil from '@/util/dashboard'
import {
  getDailyReport as fetchDailyReport,
  getReferral as fetchReferral,
  getRegion as fetchRegion,
} from '@/api/dashboard'

export default {
  name: 'dashboard',
  namespaced: true,
  state: {
    isDailyReportLoading: false,
    dailyReport: null,
    isReferralLoading: false,
    referral: null,
    isRegionLoading: false,
    region: null,
  },
  getters: {
    getIsDailyReportLoading(state) {
      return state.isDailyReportLoading
    },
    getDailyReport(state) {
      return state.dailyReport
    },
    getIsReferralLoading(state) {
      return state.isReferralLoading
    },
    getReferral(state) {
      return state.referral
    },
    getIsRegionLoading(state) {
      return state.isRegionLoading
    },
    getRegion(state) {
      return state.region
    },
  },
  mutations: {
    setIsDailyReportLoading(state, value) {
      state.isDailyReportLoading = value
    },
    setDailyReport(state, value) {
      state.dailyReport = value
    },
    setIsReferralLoading(state, value) {
      state.isReferralLoading = value
    },
    setReferral(state, value) {
      state.referral = value
    },
    setIsRegionLoading(state, value) {
      state.isRegionLoading = value
    },
    setRegion(state, value) {
      state.region = value
    },
  },
  actions: {
    async getDailyReport({ commit, getters }) {
      const isLoading = getters.getIsDailyReportLoading
      if (isLoading) {
        return
      }

      try {
        commit('setIsDailyReportLoading', true)

        const { data } = await fetchDailyReport()
        const result = DashboardUtil.segment(data)
        const seg = result.segment[0]
        const rows = result.rows

        // 날짜 정렬
        rows.sort((a, b) => new Date(a[seg.idx]) - new Date(b[seg.idx]))

        for (const row of rows) {
          seg.data.push(row[seg.idx])

          for (const metr of result.metric) {
            metr.data.push(parseInt(row[metr.idx]))
          }
        }

        commit('setDailyReport', result)
      } finally {
        commit('setIsDailyReportLoading', false)
      }
    },
    async getReferral({ commit, getters }) {
      const isLoading = getters.getIsReferralLoading
      if (isLoading) {
        return
      }

      try {
        commit('setIsReferralLoading', true)
        const { data } = await fetchReferral()
        const result = DashboardUtil.segment(data)
        commit('setReferral', result)
      } finally {
        commit('setIsReferralLoading', false)
      }
    },
    async getRegion({ commit, getters }) {
      const isLoading = getters.getIsRegionLoading
      if (isLoading) {
        return
      }

      try {
        commit('setIsRegionLoading', true)
        const { data } = await fetchRegion()
        const result = DashboardUtil.segment(data)
        commit('setRegion', result)
      } finally {
        commit('setIsRegionLoading', false)
      }
    },
  },
}
