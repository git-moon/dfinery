<template>
  <div class="dashboard-board">
    <v-row no-gutters>
      <v-col cols="12" class="mb-2">
        <slot name="title">
          <p class="dashboard-board__title">{{ title }}</p>
        </slot>
      </v-col>
    </v-row>

    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped>
.dashboard-board {
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);

  padding: 25px 15px;
}

.dashboard-board__title {
  color: #288de6;
  font-weight: 900;
  font-size: 17px;
  margin-bottom: 0 !important;
}
</style>
