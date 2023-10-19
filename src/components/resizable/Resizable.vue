<template>
  <div class="resizable" :style="styleSize">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      size: null,
    }
  },
  computed: {
    styleSize() {
      const result = { width: '100%', height: '100%' }
      const { width, height } = this.item
      if (width) {
        result.width = width
      }
      if (height) {
        result.height = height
      }
      return result
    },
  },
  watch: {
    size() {
      this.saveSettings()
    },
  },
  mounted() {
    const mutationHandler = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
          const { target } = mutation

          this.size = { width: target.offsetWidth, height: target.offsetHeight }
        }
      }
    }
    const mo = new MutationObserver(mutationHandler)

    mo.observe(this.$el, {
      attributes: true,
    })
  },
  methods: {
    saveSettings() {
      const key = this.item?.key
      if (!key) {
        return
      }

      // width 는 비율
      // height 는 px로 저장한다
      const parent = this.$el.parentElement
      const outerWidth = parent.offsetWidth

      const width = `${Math.floor((this.size.width / outerWidth) * 100)}%`
      const height = `${this.size.height}px`
      const settings = { width, height }
      localStorage.setItem(key, JSON.stringify(settings))
    },
  },
}
</script>

<style scoped>
.resizable {
  min-width: 250px;
  min-height: 200px;
  height: 100%;

  resize: both;
  overflow: auto;
}
</style>
