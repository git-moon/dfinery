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
      localStorage.setItem(key, JSON.stringify(value))
    },
    loadSettings() {
      let tempDrags = this.elements.map((el) => {
        let sizeSettings = localStorage.getItem(el.key)
        if (sizeSettings) {
          sizeSettings = JSON.parse(sizeSettings)
          const { width, height } = sizeSettings
          el.width = width
          el.height = height
        }
        return el
      })

      const dragSettings = localStorage.getItem(this.dragKey)
      if (!dragSettings) {
        this.drags = tempDrags
        return
      }

      // 저장 순서에 따른 엘리먼트 배치
      const dragKeys = JSON.parse(dragSettings)
      tempDrags = dragKeys.map((drag) => {
        const el = tempDrags.filter((el) => el.key === drag)[0]
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
