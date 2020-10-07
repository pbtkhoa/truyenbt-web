<template>
  <main-content :mangas="historiesManga" />
</template>

<script lang="ts">
import Vue from 'vue'
import MainContent from '~/components/lichsu/index.vue'
import { MangaActions } from '~/store/manga'
import { MangaSortDate } from '~/utils/constants'
import MangaHistory from '~/models/MangaHistory'
import localStorage from '~/utils/localStorage'

export default Vue.extend({
  layout: 'dashboard',
  components: {
    MainContent,
  },
  async asyncData({ store }): Promise<void> {
    await Promise.all([
      store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.WEEK),
      store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.MONTH),
      store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.YEAR),
    ])
  },
  data() {
    return {
      historiesManga: [] as MangaHistory[],
    }
  },
  mounted() {
    this.historiesManga = localStorage.getHistoryMangas()
  },
})
</script>
