<template>
  <vuedraggable
    v-if="draggable"
    v-model="drags"
    v-bind="bindOptions"
    class="resizable-box"
    :move="onMoveCallback"
    @update="onUpdate"
  >
    <slot :items="drags"></slot>
  </vuedraggable>
  <div v-else class="resizable-box">
    <slot></slot>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable'
import { arrayMove } from '@/util'

export default {
  props: {
    draggable: {
      type: Boolean,
      default: false,
    },
    elements: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    vuedraggable,
  },
  data() {
    return {
      dragKey: 'drags',
      resizeKey: 'resize',
      bindOptions: {
        disabled: false,
      },
      drags: [],
      dragStore: null,
    }
  },
  created() {
    this.loadSettings()
  },
  methods: {
    saveSettings(key, value) {
      localStorage.setItem(key, value)
    },
    loadSettings() {
      const myDrags = localStorage.getItem(this.dragKey)
      if (!myDrags) {
        this.drags = [...this.elements]
        return
      }

      // 저장 순서에 따른 엘리먼트 배치
      const dragKeys = myDrags.split(',')
      const tempDrags = dragKeys.map((drag) => {
        const el = this.elements.filter((el) => el.key === drag)[0]
        let sizeSettings = localStorage.getItem(el.key)
        if (sizeSettings) {
          sizeSettings = JSON.parse(sizeSettings)
          const { width, height } = sizeSettings
          el.width = width
          el.height = height
        }
        return el
      })
      this.drags = tempDrags
    },
    onMoveCallback(e) {
      const { index, futureIndex } = e.draggedContext
      const beforeList = e.relatedContext.list
      const keyList = beforeList.map((el) => el.key)

      arrayMove(keyList, index, futureIndex)
      this.dragStore = keyList
    },
    onUpdate() {
      this.saveSettings(this.dragKey, this.dragStore)
    },
  },
}
</script>

<style scoped>
.resizable-box {
  display: flex;
  flex-wrap: wrap;
}
</style>
