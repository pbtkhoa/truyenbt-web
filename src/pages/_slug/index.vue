<template>
  <section :class="$style.detail">
    <profile
      :manga="manga"
      :on-click-like-manga="onClickLikeManga"
      :on-click-follow-manga="onClickFollowManga"
      :on-click-un-follow-manga="onClickUnFollowManga"
      :is-like-processing="isLikeProcessing"
      :is-follow-processing="isFollowProcessing"
    />
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
      isFollowProcessing: false,
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
      await this.$store.dispatch(MangaActions.LIKE_MANGA, this.slug)
      this.isLikeProcessing = false
    },
    async onClickFollowManga() {
      this.isFollowProcessing = true
      await this.$store.dispatch(MangaActions.FOLLOW_MANGA, this.slug)
      this.isFollowProcessing = false
    },
    async onClickUnFollowManga() {
      this.isFollowProcessing = true
      await this.$store.dispatch(MangaActions.UN_FOLLOW_MANGA, this.slug)
      this.isFollowProcessing = false
    },
  },
})
</script>

<style lang="scss" module>
.detail {
  padding: 20px 0 0;
}
</style>
