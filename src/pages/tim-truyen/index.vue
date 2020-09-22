<template>
  <tim-truyen
    :cur-tag="tag"
    :status="status"
    :on-change-paginate="onChangePaginate"
    :on-change-status="onChangeStatus"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import TimTruyen from '~/components/timtruyen/index.vue'
import { MangaActions } from '~/store/manga'
import { MangaStatus } from '~/utils/constants'

export default Vue.extend({
  layout: 'dashboard',
  components: {
    TimTruyen,
  },
  async fetch() {
    const { tag, status } = this.$route.query as { [key: string]: string }
    this.tag = tag
    this.status = status

    await this.$store.dispatch(MangaActions.SEARCH_MANGAS, { page: 1, tag, status })
  },
  data() {
    return {
      status: undefined as string | undefined,
      tag: undefined as string | undefined,
    }
  },
  watch: {
    '$route.query': '$fetch',
  },
  methods: {
    async onChangePaginate(page: number) {
      await this.$store.dispatch(MangaActions.SEARCH_MANGAS, { page, tag: this.tag, status: this.status })
    },
    onChangeStatus(status: MangaStatus | undefined) {
      this.status = status
    },
  },
})
</script>
