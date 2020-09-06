<template>
  <section :class="['bg-white', $style.chapterDetail]">
    <div :class="['position-sticky', $style.chapterInfo]">
      <div class="container">
        <h1 :class="$style.chapterName">
          {{ mangaChapter.name }} - Chap {{ mangaChapter.chapter.number }}
        </h1>
        <div :class="$style.chapterPaginate">
          <div :class="$style.selectView">
            <v-select
              v-model="selectedChapter"
              :options="chapterList"
              :clearable="false"
              label="label"
            ></v-select>
          </div>
          <div :class="$style.navigate">
            <nuxt-link
              v-if="prevChapter"
              :to="{
                name: 'slug-chapter',
                params: { slug, chapter: prevChapter.number },
              }"
              >Chap trước</nuxt-link
            >
            <nuxt-link
              v-if="nextChapter"
              :to="{
                name: 'slug-chapter',
                params: { slug, chapter: nextChapter.number },
              }"
              >Chap sau</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.chapterImages">
      <img
        v-for="image in mangaChapter.chapter.images"
        :key="image._id"
        :src="image.imageUrl"
        :alt="mangaChapter.name"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import VSelect from 'vue-select'
import { MangaActions } from '~/store/manga'
import MangaChapter from '~/models/MangaChapter'
import Chapter from '~/models/Chapter'

export default Vue.extend({
  layout: 'dashboard',
  components: {
    VSelect,
  },
  async asyncData({
    store,
    params: { slug, chapter },
  }): Promise<{
    slug: string
    chapter: string
    chapterList: Chapter[]
    selectedChapter: Chapter | null
    mangaChapter: MangaChapter | null
  }> {
    const mangaChapter: MangaChapter | null = await store.dispatch(
      MangaActions.GET_DETAIL_MANGA_CHAPTER,
      {
        slug,
        chapter,
      }
    )

    let chapterList: Chapter[] = []
    let selectedChapter: Chapter | null = null
    if (mangaChapter) {
      chapterList = mangaChapter.chapters
        .slice()
        .reverse()
        .map((chapter: Chapter) => ({
          ...chapter,
          label: `Chương ${chapter.number}`,
        }))

      selectedChapter =
        chapterList.find((c) => `${c.number}` === `${chapter}`) || null
    }

    return {
      slug,
      chapter,
      mangaChapter,
      selectedChapter,
      chapterList,
    }
  },
  data() {
    return {
      chapterList: [] as Chapter[],
      slug: '' as string,
      mangaChapter: null as MangaChapter | null,
      selectedChapter: null as Chapter | null,
    }
  },
  computed: {
    prevChapter(): Chapter | null {
      const currentChapterIdx: number = this.selectedChapter
        ? this.chapterList.findIndex(
            (chapter) => chapter.number === this.selectedChapter!.number
          )
        : -1

      return this.chapterList[currentChapterIdx - 1]
    },
    nextChapter(): Chapter | null {
      const currentChapterIdx: number = this.selectedChapter
        ? this.chapterList.findIndex(
            (chapter) => chapter.number === this.selectedChapter!.number
          )
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
})
</script>
<style lang="scss">
@import '~vue-select/src/scss/vue-select.scss';
</style>

<style lang="scss" module>
.chapterDetail {
  padding: 10px 0 0;
  .chapterInfo {
    top: 0;
    background-color: white;
    padding-top: 10px;
    padding-bottom: 20px;
    .chapterName {
      font-size: $h3-font-size;
      margin-bottom: 15px;
    }
    .chapterPaginate {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .selectView {
        min-width: 300px;
      }
      .navigate {
        a {
          margin-left: 10px;
          border-radius: 3px;
          border: 1px solid $primary;
          background-color: transparent;
          color: $primary;
          padding: 8px 10px;
          text-decoration: none;
          transition: 0.2s all;
          &:hover {
            transition: 0.2s all;
            background-color: $primary;
            color: $white;
          }
        }
      }
    }
  }
  .chapterImages {
    padding-bottom: 40px;
    text-align: center;
    img {
      height: auto;
      max-width: 100%;
    }
  }
}
</style>
