<template>
  <div id="homepage">
    <slide />
    <manga-latest :on-change-paginate="onChangePaginate" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Slide from '~/components/homepage/Slide.vue'
import MangaLatest from '~/components/homepage/MangaLatest.vue'
import { MangaActions } from '~/store/manga'

export default Vue.extend({
  layout: 'dashboard',
  components: {
    Slide,
    MangaLatest,
  },
  async asyncData({ store }): Promise<void> {
    await store.dispatch(MangaActions.GET_HOT_MANGAS)
    await store.dispatch(MangaActions.GET_LATEST_MANGAS)
  },
  methods: {
    async onChangePaginate(page: number) {
      await this.$store.dispatch(MangaActions.GET_LATEST_MANGAS, page)
    },
  },
})
</script>
