<template>
  <manga-latest :on-change-paginate="onChangePaginate" />
</template>

<script lang="ts">
import Vue from 'vue'
import MangaLatest from '~/components/homepage/MangaLatest.vue'
import { MangaActions } from '~/store/manga'

export default Vue.extend({
  layout: 'dashboard',
  components: {
    MangaLatest,
  },
  async asyncData({ store }): Promise<void> {
    await store.dispatch(MangaActions.GET_LATEST_MANGA)
  },
  methods: {
    async onChangePaginate(page: number) {
      await this.$store.dispatch(MangaActions.GET_LATEST_MANGA, page)
    },
  },
})
</script>
