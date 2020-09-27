<template>
  <section :class="$style.detail">
    <profile :manga="manga" :on-click-like-manga="onClickLikeManga" :is-like-processing="isLikeProcessing" />
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
  data() {
    return {
      slug: '',
      isLikeProcessing: false,
    }
  },
  computed: {
    manga(): Manga | null {
      return this.$accessor.manga.item
    },
  },
  methods: {
    async onClickLikeManga() {
      this.isLikeProcessing = true
      await this.$store.dispatch(MangaActions.INC_LIKE_MANGA, this.slug)
      this.isLikeProcessing = false
    },
  },
})
</script>

<style lang="scss" module>
.detail {
  padding: 20px 0 0;
}
</style>
