<template>
  <v-data-table
    :items="items"
    :sort-by="sort.by"
    :sort-desc="sort.desc"
    hide-default-header
    hide-default-footer
    disable-pagination
  >
    <template v-slot:item="props">
      <tr @click="clickRow(props)">
        <td
          style="width: 35%"
          class="td-border"
          :class="{ 'cursor--pointer': hasExpand(props.item) }"
        >
          <p class="d-flex align-center ma-0" :style="styleDepth">
            <v-icon v-if="hasExpand(props.item)" small>
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
            :depth="depth + 1"
          ></ExpandableTable>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import ExpandableTable from './ExpandableTable.vue'

export default {
  name: 'ExpandableTable',
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    sort: {
      type: Object,
      default: () => {},
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  components: {
    ExpandableTable,
  },
  data() {
    return {
      padding: 25,
    }
  },
  computed: {
    styleDepth() {
      return { paddingLeft: `${this.padding * this.depth}px` }
    },
  },
  methods: {
    hasExpand(item) {
      return item.expand?.length > 0
    },
    clickRow(props) {
      const { item } = props
      if (!item?.expand) {
        return
      }
      item.isSelected = !item.isSelected
      props.expand(true)
    },
  },
}
</script>
