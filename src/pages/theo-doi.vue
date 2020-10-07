<template>
  <main-content
    :on-change-paginate="getFollowMangas"
    :mangas="followMangas.items"
    :total-pages="followMangas.totalPages"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import MainContent from '~/components/theodoi/index.vue'
import { MangaActions } from '~/store/manga'
import { MangaSortDate } from '~/utils/constants'
import Manga from '~/models/Manga'

export default Vue.extend({
  layout: 'dashboard',
  components: {
    MainContent,
  },
  async fetch(): Promise<void> {
    await Promise.all([
      this.getFollowMangas(),
      this.$store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.WEEK),
      this.$store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.MONTH),
      this.$store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.YEAR),
    ])
  },
  data() {
    return {
      followMangas: {
        items: [] as Manga[],
        totalPages: 1 as number,
      } as Paginate<Manga>,
    }
  },
  methods: {
    async getFollowMangas(page: number = 1) {
      this.followMangas = await this.$axios.$get(`manga/follow-mangas?limit=12&page=${page}`)
    },
  },
})
</script>
