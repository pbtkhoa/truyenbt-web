<template>
  <section class="container"></section>
</template>

<script lang="ts">
import Vue from 'vue'
import Manga from '~/models/Manga'

export default Vue.extend({
  computed: {
    hotMangas(): Manga[] {
      return this.$accessor.manga.hotMangas
    },
  },
})
</script>

<style lang="scss" module></style>
