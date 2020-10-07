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
import Vue, { PropOptions } from 'vue'
import List from './list.vue'
import TopManga from '~/components/shared/TopManga/index.vue'
import MangaHistory from '~/models/MangaHistory'

export default Vue.extend({
  components: {
    List,
    TopManga,
  },
  props: {
    mangas: {
      type: Array,
      default() {
        return []
      },
    } as PropOptions<MangaHistory[]>,
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
