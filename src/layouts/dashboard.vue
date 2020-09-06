<template>
  <main :class="$style.dashboard">
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

<style lang="scss" module>
.dashboard {
  background-color: $gray-200;
}
</style>
