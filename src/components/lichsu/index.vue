<template>
  <section class="bg-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-12 gap-5">
        <div class="pt-4 col-span-8">
          <h2 class="text-2xl mb-4 text-gray-900 uppercase">LỊCH SỬ ĐỌC TRUYỆN</h2>
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
