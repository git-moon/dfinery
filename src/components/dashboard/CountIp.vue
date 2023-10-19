<template>
  <DefaultBoard :title="title">
    <v-row no-gutters>
      <v-col cols="12">
        <v-data-table
          v-if="!!dataTable"
          :headers="headers"
          :items="dataTable"
          :sort-by="sort.by"
          :sort-desc="sort.desc"
        >
          <template v-slot:header>
            <thead>
              <tr>
                <th class="table-header">
                  <span>GroupBy</span>
                </th>
                <th class="table-header">
                  <span>Metrics</span>
                </th>
              </tr>
            </thead>
          </template>
          <template v-slot:item="props">
            <tr @click="clickRow(props)">
              <td style="cursor: pointer" class="td-border">
                <p class="d-flex align-center ma-0">
                  <v-icon small>
                    {{
                      props.item.isSelected
                        ? 'mdi-chevron-down-circle'
                        : 'mdi-chevron-right-circle-outline'
                    }}
                  </v-icon>
                  <span class="ml-2">
                    {{ props.item.text ? props.item.text : props.item.ip }}
                  </span>
                </p>
              </td>
              <td>
                <p class="ma-0">{{ props.item.value | commaFormat }}</p>
              </td>
            </tr>
          </template>
          <template v-slot:expanded-item="{ item }">
            <tr v-show="item.isSelected">
              <td :colspan="headers.length" class="pa-0">
                <ExpandableTable
                  :headers="headers"
                  :items="item.expand"
                  :sort="sort"
                  :depth="1"
                ></ExpandableTable>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </DefaultBoard>
</template>

<script>
import { mapGetters } from 'vuex'

import DefaultBoard from './template/DefaultBoard.vue'
import ExpandableTable from '@/components/datatable/ExpandableTable.vue'

export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  components: {
    DefaultBoard,
    ExpandableTable,
  },
  data() {
    return {
      ipData: null,
      sort: {
        by: 'value',
        desc: true,
      },
      dataTable: null,
    }
  },
  computed: {
    ...mapGetters('dashboard', {
      region: 'getRegion',
    }),
    headers() {
      const groupBy = this.region.segment.map((seg) => {
        return seg.label
      })
      const unique = this.region.metric[0]

      return [
        { text: groupBy.join(' > '), value: 'text', width: '35%' },
        { text: `sum(${unique.label})`, value: 'value' },
      ]
    },
  },
  watch: {
    region() {
      this.makeData()
    },
  },
  methods: {
    clickRow(props) {
      const { item } = props
      item.isSelected = !item.isSelected
      props.expand(true)
    },
    makeIpMap(map, arr, depth) {
      // ip별 count를 저장하는 재귀함수

      // 지역이 공백인 경우 'empty' 로 처리
      const ipKey = arr[0] || '(empty)'
      if (depth < 2) {
        const value = map.get(ipKey) || { value: 0 }
        value.value = parseInt(arr[1])
        map.set(ipKey, value)
        return map
      }

      const ip = map.get(ipKey)
      if (!ip) {
        const newIp = this.makeIpMap(new Map(), arr.slice(1), depth - 1)
        map.set(ipKey, newIp)
      } else {
        this.makeIpMap(ip, arr.slice(1), depth - 1)
      }

      return map
    },
    getIpValue(map, arr) {
      const ipKey = arr[0]
      if (arr.length === 1) {
        return map.get(ipKey)
      }

      return this.getIpValue(map.get(ipKey), arr.slice[1])
    },
    setSummary(ipData) {
      if (ipData?.value !== undefined) {
        return ipData.value
      }

      const summary = { size: ipData.size, total: 0 }
      for (const [key, value] of ipData) {
        if (key !== 'summary') {
          const count = this.setSummary(value)
          if (count !== null) {
            summary.total += count
          } else {
            summary.total += value.get('summary').total
          }
        }
      }

      ipData.set('summary', summary)
      return null
    },
    setDataTable(ipData) {
      const result = []

      for (const [key, value] of ipData) {
        if (key !== 'summary') {
          const table = {
            ip: key,
            text: null,
            expand: null,
            size: null,
            value: null,
            isSelected: false,
          }

          // 포함된 Map이 더 있을 때 재귀
          if (typeof value[Symbol.iterator] === 'function') {
            const summary = value.get('summary')
            const dataTable = this.setDataTable(value)

            table.text = `${key}(${summary.size})`
            table.expand = dataTable
            table.size = summary.size
            table.value = summary.total
          } else {
            table.value = value.value
          }

          result.push(table)
        }
      }

      return result
    },
    makeData() {
      const depth = this.region.segment.length
      const rows = this.region.rows

      const ipData = new Map()
      for (const row of rows) {
        this.makeIpMap(ipData, row, depth)
      }
      this.setSummary(ipData)
      this.ipData = ipData

      const dataTable = this.setDataTable(ipData)
      this.dataTable = dataTable
    },
  },
}
</script>

<style>
.cursor--pointer {
  cursor: pointer;
}

.td-border {
  border-left: thin solid rgba(0, 0, 0, 0.12);
  border-right: thin solid rgba(0, 0, 0, 0.12);
}
</style>

<style scoped>
table {
  border-collapse: separate;
}

:deep(.v-data-table-header),
.table-header {
  background-color: #f5f7fb !important;
}
</style>
