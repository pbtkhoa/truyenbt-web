<template>
  <section class="bg-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-12 gap-5">
        <div class="pt-4 col-span-8">
          <h2 class="text-2xl mb-4 text-gray-900 uppercase">TRUYỆN MỚI CẬP NHẬT</h2>
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
