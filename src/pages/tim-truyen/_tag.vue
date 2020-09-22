<template>
  <div id="search-manga">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <manga-list :on-change-paginate="onChangePaginate" :mangas="mangas" :total-pages="totalPages" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MangaList from '~/components/shared/MangaList.vue'
import { MangaActions } from '~/store/manga'
import Manga from '~/models/Manga'

export default Vue.extend({
  layout: 'dashboard',
  components: {
    MangaList,
  },
  async asyncData({ store, params: { tag } }) {
    await store.dispatch(MangaActions.SEARCH_MANGAS, { page: 1, tag })
    return { tag }
  },
  data() {
    return {
      tag: '' as string,
    }
  },
  computed: {
    mangas(): Manga[] {
      return this.$accessor.manga.paginateList.items
    },
    totalPages(): number {
      return this.$accessor.manga.paginateList.totalPages
    },
  },
  methods: {
    async onChangePaginate(page: number) {
      await this.$store.dispatch(MangaActions.SEARCH_MANGAS, { page, tag: this.tag })
    },
  },
})
</script>
