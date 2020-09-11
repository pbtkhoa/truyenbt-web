<template>
  <section :class="$style.detail">
    <profile :manga="manga" />
    <chapter-list :chapters="manga.chapters" :slug="slug" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Profile from '~/components/detail/Profile.vue'
import ChapterList from '~/components/detail/ChapterList.vue'
import { MangaActions } from '~/store/manga'
import Manga from '~/models/Manga'

export default Vue.extend({
  layout: 'dashboard',
  components: {
    Profile,
    ChapterList,
  },
  async asyncData({ store, params: { slug } }) {
    await store.dispatch(MangaActions.GET_DETAIL_MANGAS, slug)

    return { slug }
  },
  computed: {
    manga(): Manga | null {
      return this.$accessor.manga.item
    },
  },
})
</script>

<style lang="scss" module>
.detail {
  padding: 20px 0 0;
}
</style>
