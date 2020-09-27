<template>
  <section :class="['bg-white']">
    <div class="container">
      <div class="row">
        <div class="col-md-8 pt-4">
          <h2 :class="$style.title">LỊCH SỬ ĐỌC TRUYỆN</h2>
          <list :mangas="mangas" />
        </div>
        <top-manga />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import List from './list.vue'
import TopManga from '~/components/shared/TopManga/index.vue'
import MangaHistory from '~/models/MangaHistory'
import { MangaActions } from '~/store/manga'

export default Vue.extend({
  components: {
    List,
    TopManga,
  },
  computed: {
    mangas(): MangaHistory[] {
      return this.$accessor.manga.historiesManga
    },
  },
  mounted() {
    this.$store.dispatch(MangaActions.GET_HISTORIES_MANGA)
  },
})
</script>

<style module lang="scss">
.title {
  font-size: $h5-font-size * 1.1;
  color: $gray-900;
  text-transform: uppercase;
}
</style>
