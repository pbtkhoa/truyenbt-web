<template>
  <div id="homepage">
    <slide />
    <main-content :on-change-paginate="onChangePaginate" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Slide from '~/components/homepage/Slide.vue'
import MainContent from '~/components/homepage/main/index.vue'
import { MangaActions } from '~/store/manga'
import { MangaSortDate } from '~/utils/constants'

export default Vue.extend({
  layout: 'dashboard',
  components: {
    Slide,
    MainContent,
  },
  async asyncData({ store }): Promise<void> {
    await Promise.all([
      store.dispatch(MangaActions.GET_HOT_MANGAS),
      store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.WEEK),
      store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.MONTH),
      store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.YEAR),
      store.dispatch(MangaActions.GET_LATEST_MANGAS),
    ])
  },
  methods: {
    async onChangePaginate(page: number) {
      await this.$store.dispatch(MangaActions.GET_LATEST_MANGAS, page)
    },
  },
})
</script>
