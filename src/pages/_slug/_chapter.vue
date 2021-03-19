<template>
  <section class="bg-white pt-3">
    <div class="sticky bg-white pt-3 pb-6 top-0">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl mb-4">{{ mangaChapter.name }} - Chap {{ mangaChapter.chapter.number }}</h1>
        <div class="flex flex-wrap justify-between">
          <v-select
            v-model="selectedChapter"
            :options="chapterList"
            :clearable="false"
            label="label"
            class="w-64"
          ></v-select>
          <div>
            <nuxt-link
              v-if="prevChapter"
              :to="{
                name: 'slug-chapter',
                params: { slug, chapter: prevChapter.number },
              }"
              class="ml-2 py-2 px-3 no-underline rounded border border-primary bg-transparent text-primary transition hover:bg-primary hover:text-white"
            >
              Chap trước
            </nuxt-link>
            <nuxt-link
              v-if="nextChapter"
              :to="{
                name: 'slug-chapter',
                params: { slug, chapter: nextChapter.number },
              }"
              class="ml-2 py-2 px-3 no-underline rounded border border-primary bg-transparent text-primary transition hover:bg-primary hover:text-white"
            >
              Chap sau
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="pb-10 text-center">
      <img
        v-for="(image, index) in media"
        :key="index"
        v-lazy="image.src || image.thumb"
        class="h-auto block m-auto max-w-full"
        @click="openGallery(index)"
      />
    </div>
    <client-only>
      <light-box ref="lightbox" :show-light-box="false" :site-loading="imageLoading" :media="media" />
    </client-only>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import VSelect from 'vue-select'
import MangaChapter from '~/models/MangaChapter'
import Chapter from '~/models/Chapter'
import localStorage from '~/utils/localStorage'

type MediaLightbox = {
  thumb: string
  src: string
}

export default Vue.extend({
  layout: 'dashboard',
  components: {
    VSelect,
  },
  async asyncData({ $axios, params: { slug, chapter } }) {
    const mangaChapter: MangaChapter | null = await $axios.$get(`manga/${slug}/${chapter}`)

    let chapterList: Chapter[] = []
    let selectedChapter: Chapter | null = null
    let media: MediaLightbox[] = []
    if (mangaChapter) {
      chapterList = mangaChapter.chapters
        .slice()
        .reverse()
        .map((chapter: Chapter) => ({
          ...chapter,
          label: `Chương ${chapter.number}`,
        }))

      selectedChapter = chapterList.find((c) => `${c.number}` === `${chapter}`) || null

      media =
        !!mangaChapter.chapter &&
        mangaChapter.chapter.images.map((image) => ({
          src: image.imageUrl,
          thumb: image.imageUrl,
        }))
    }

    return {
      slug,
      chapter,
      mangaChapter,
      selectedChapter,
      chapterList,
      media,
    }
  },
  data() {
    return {
      chapterList: [] as Chapter[],
      slug: '' as string,
      mangaChapter: null as MangaChapter | null,
      selectedChapter: null as Chapter | null,
      media: [] as MediaLightbox[],
      imageLoading: require('~/assets/loading.gif'),
    }
  },
  computed: {
    prevChapter(): Chapter | null {
      const currentChapterIdx: number = this.selectedChapter
        ? this.chapterList.findIndex((chapter) => chapter.number === this.selectedChapter!.number)
        : -1

      return this.chapterList[currentChapterIdx - 1]
    },
    nextChapter(): Chapter | null {
      const currentChapterIdx: number = this.selectedChapter
        ? this.chapterList.findIndex((chapter) => chapter.number === this.selectedChapter!.number)
        : -1

      return this.chapterList[currentChapterIdx + 1]
    },
  },
  watch: {
    selectedChapter(chapter: Chapter) {
      this.$router.push({
        name: 'slug-chapter',
        params: { slug: this.slug, chapter: chapter.number },
      })
    },
  },
  mounted() {
    if (this.mangaChapter) {
      localStorage.saveHistoryManga(this.mangaChapter)
    }
  },
  methods: {
    openGallery(index: number) {
      this.$refs.lightbox.showImage(index)
    },
  },
})
</script>
<style lang="scss">
@import '~vue-select/src/scss/vue-select.scss';
</style>
