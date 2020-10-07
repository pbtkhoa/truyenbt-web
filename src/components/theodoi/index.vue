<template>
  <section :class="['bg-white']">
    <div class="container">
      <div class="row">
        <div class="col-md-8 pt-4">
          <h2 :class="$style.title">TRUYỆN MỚI CẬP NHẬT</h2>
          <manga-list :on-change-paginate="onChangePaginate" :mangas="mangas" :total-pages="totalPages" />
        </div>
        <top-manga />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import TopManga from '~/components/shared/TopManga/index.vue'
import MangaList from '~/components/shared/MangaList.vue'
import Manga from '~/models/Manga'

export default Vue.extend({
  components: {
    MangaList,
    TopManga,
  },
  props: {
    mangas: {
      type: Array,
      default() {
        return []
      },
    } as PropOptions<Manga[]>,
    totalPages: {
      type: Number,
      default: 0,
    },
    onChangePaginate: {
      type: Function,
      default: () => {},
    },
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
