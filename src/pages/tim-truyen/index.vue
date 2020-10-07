<template>
  <tim-truyen
    :tag="tag"
    :status="status"
    :sort="sort"
    :keyword="keyword"
    :mangas="searchMangas.items"
    :total-pages="searchMangas.totalPages"
    :on-change-paginate="getSearchMangas"
    :on-submit-search="submitSearch"
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
    const { tag, status, sort, keyword } = this.$route.query as { [key: string]: string }
    this.tag = tag
    this.status = status
    this.sort = sort
    this.keyword = keyword

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
      keyword: undefined as string | undefined,
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
          keyword: this.keyword,
          status: this.status,
          sort: this.sort,
          tags: this.tag,
          limit: 12,
        },
      })
    },
    submitSearch(submitEvent: any) {
      const keyword: string = submitEvent.target.elements.keyword.value
      this.$router.push({
        name: 'tim-truyen',
        query: {
          sort: this.sort,
          tag: this.tag,
          status: this.status,
          keyword: keyword || undefined,
        },
      })
    },
  },
})
</script>
