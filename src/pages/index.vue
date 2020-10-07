<template>
  <div id="homepage">
    <slide :hot-mangas="hotMangas" />
    <main-content
      :on-change-paginate="getLatestManga"
      :mangas="latestMangas.items"
      :total-pages="latestMangas.totalPages"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Slide from '~/components/homepage/Slide.vue'
import MainContent from '~/components/homepage/main.vue'
import { MangaActions } from '~/store/manga'
import { MangaSortDate } from '~/utils/constants'
import Manga from '~/models/Manga'

export default Vue.extend({
  layout: 'dashboard',
  components: {
    Slide,
    MainContent,
  },
  async fetch() {
    await Promise.all([
      this.getLatestManga(),
      this.getHotMangas(),
      this.$store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.WEEK),
      this.$store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.MONTH),
      this.$store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.YEAR),
    ])
  },
  data() {
    return {
      hotMangas: [] as Manga[],
      latestMangas: {
        items: [] as Manga[],
        totalPages: 1 as number,
      } as Paginate<Manga>,
    }
  },
  methods: {
    async getHotMangas() {
      this.hotMangas = await this.$axios.$get(`manga/hot-mangas`)
    },
    async getLatestManga(page: number = 1) {
      this.latestMangas = await this.$axios.$get(`manga?limit=12&page=${page}`)
    },
  },
})
</script>
