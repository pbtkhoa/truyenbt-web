<template>
  <tim-truyen :tag="tag" :status="status" :sort="sort" :on-change-paginate="onChangePaginate" />
</template>

<script lang="ts">
import Vue from 'vue'
import TimTruyen from '~/components/timtruyen/index.vue'
import { MangaActions } from '~/store/manga'

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

    await this.$store.dispatch(MangaActions.SEARCH_MANGAS, { page: 1, tag, status, sort })
  },
  data() {
    return {
      status: undefined as string | undefined,
      tag: undefined as string | undefined,
      sort: undefined as string | undefined,
    }
  },
  watch: {
    '$route.query': '$fetch',
  },
  methods: {
    async onChangePaginate(page: number) {
      await this.$store.dispatch(MangaActions.SEARCH_MANGAS, {
        page,
        tag: this.tag,
        status: this.status,
        sort: this.sort,
      })
    },
  },
})
</script>
