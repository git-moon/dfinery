<template>
  <v-app>
    <v-main class="px-2 py-3">
      <Dashboard />
    </v-main>
  </v-app>
</template>

<script>
import Dashboard from '@/components/Dashboard.vue'

export default {
  name: 'App',

  components: {
    Dashboard,
  },

  data: () => ({
    //
  }),
}
</script>

<style scoped>
main {
  background-color: #f6f8fa;
}
</style>
