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
    <chapter-list :chapters="manga.chapters" :slug="manga.slug" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Profile from '~/components/detail/Profile.vue'
import ChapterList from '~/components/detail/ChapterList.vue'
import Manga from '~/models/Manga'

export default Vue.extend({
  layout: 'dashboard',
  components: {
    Profile,
    ChapterList,
  },
  async asyncData({ $axios, params: { slug } }) {
    const manga: Manga = await $axios.$get(`manga/${slug}`)

    return { manga }
  },
  data() {
    return {
      manga: null as Manga | null,
      isLikeProcessing: false,
      isFollowProcessing: false,
    }
  },
  methods: {
    async onClickLikeManga() {
      if (this.manga) {
        this.isLikeProcessing = true

        await this.$axios.$put(`manga/${this.manga.slug}/like`)
        this.manga = { ...this.manga, isLike: true, like: this.manga.like + 1 }

        this.isLikeProcessing = false
      }
    },
    async onClickFollowManga() {
      if (this.manga) {
        this.isFollowProcessing = true

        await this.$axios.$put(`manga/${this.manga.slug}/follow`)
        this.manga = { ...this.manga, isFollow: true, follow: this.manga.follow + 1 }

        this.isFollowProcessing = false
      }
    },
    async onClickUnFollowManga() {
      if (this.manga) {
        this.isFollowProcessing = true

        await this.$axios.$delete(`manga/${this.manga.slug}/follow`)
        this.manga = { ...this.manga, isFollow: false, follow: this.manga.follow - 1 }

        this.isFollowProcessing = false
      }
    },
  },
})
</script>

<style lang="scss" module>
.detail {
  padding: 20px 0 0;
}
</style>
