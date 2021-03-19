<template>
  <main class="bg-gray-100">
    <Header />
    <Nuxt />
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import Header from '~/components/shared/Header.vue'
export default Vue.extend({
  components: {
    Header,
  },
})
</script>
