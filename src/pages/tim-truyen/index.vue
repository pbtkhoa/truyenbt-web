<template>
  <tim-truyen
    :tag="tag"
    :status="status"
    :sort="sort"
    :mangas="searchMangas.items"
    :total-pages="searchMangas.totalPages"
    :on-change-paginate="getSearchMangas"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import TimTruyen from '~/components/timtruyen/index.vue'
import Manga from '~/models/Manga'

export default Vue.extend({
  layout: 'dashboard',
  components: {
    TimTruyen,
  },
  async fetch() {
    const { tag, status, sort } = this.$route.query as { [key: string]: string }
    this.tag = tag
    this.status = status
    this.sort = sort

    await this.getSearchMangas()
  },
  data() {
    return {
      searchMangas: {
        items: [] as Manga[],
        totalPages: 1 as number,
      },
      status: undefined as string | undefined,
      tag: undefined as string | undefined,
      sort: undefined as string | undefined,
    }
  },
  watch: {
    '$route.query': '$fetch',
  },
  methods: {
    async getSearchMangas(page: number = 1) {
      this.searchMangas = await this.$axios.$get(`manga/search-mangas`, {
        params: {
          page,
          status: this.status,
          sort: this.sort,
          tags: this.tag,
          limit: 12,
        },
      })
    },
  },
})
</script>
