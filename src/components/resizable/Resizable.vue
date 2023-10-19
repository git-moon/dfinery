<template>
  <div class="resizable">
    <slot></slot>
  </div>
</template>

<script>
export default {}
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
