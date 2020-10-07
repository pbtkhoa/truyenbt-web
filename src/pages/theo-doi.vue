<template>
  <main-content :on-change-paginate="onChangePaginate" />
</template>

<script lang="ts">
import Vue from 'vue'
import MainContent from '~/components/theodoi/index.vue'
import { MangaActions } from '~/store/manga'
import { MangaSortDate } from '~/utils/constants'

export default Vue.extend({
  layout: 'dashboard',
  components: {
    MainContent,
  },
  async asyncData({ store }): Promise<void> {
    await Promise.all([
      store.dispatch(MangaActions.GET_FOLLOW_MANGAS),
      store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.WEEK),
      store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.WEEK),
      store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.MONTH),
      store.dispatch(MangaActions.GET_TOP_MANGAS, MangaSortDate.YEAR),
    ])
  },
  methods: {
    async onChangePaginate(page: number) {
      await this.$store.dispatch(MangaActions.GET_FOLLOW_MANGAS, page)
    },
  },
})
</script>
