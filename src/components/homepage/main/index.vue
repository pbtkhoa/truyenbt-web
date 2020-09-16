<template>
  <section :class="['bg-white']">
    <div class="container">
      <div class="row">
        <latest-manga :on-change-paginate="onChangePaginate" />
        <top-manga />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import LatestManga from './LatestManga.vue'
import TopManga from './TopManga/index.vue'

export default Vue.extend({
  components: {
    LatestManga,
    TopManga,
  },
  props: {
    onChangePaginate: {
      type: Function,
      default: () => {},
    },
  },
})
</script>

<style module lang="scss"></style>
